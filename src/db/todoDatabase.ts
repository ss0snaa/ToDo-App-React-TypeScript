import Dexie, {type Table} from 'dexie';

export interface TodoItem {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class TodoDatabase extends Dexie {
  todos!: Table<TodoItem>;

  constructor() {
    super('TodoDatabase');
    this.version(1).stores({
      todos: '++id, title, description, completed, createdAt, updatedAt',
    });
  }

  async addTodo(title: string, description: string): Promise<number> {
    const now = new Date();
    return this.todos.add({
      title,
      description,
      completed: false,
      createdAt: now,
      updatedAt: now,
    });
  }

  async getAllTodos(): Promise<TodoItem[]> {
    return this.todos.orderBy('createdAt').reverse().toArray();
  }

  async updateTodos(id: number, updates: Partial<TodoItem>): Promise<void> {
    await this.todos.update(id, {...updates, updatedAt: new Date()});
  }

  async deleteTodo(id: number): Promise<void> {
    await this.todos.delete(id);
  }

  async toggleTodo(id: number): Promise<void> {
    const todo = await this.todos.get(id);
    if (todo) {
      await this.todos.update(id, {
        completed: !todo.completed,
        updatedAt: new Date(),
      })
    }
  }
}

export const db = new TodoDatabase();