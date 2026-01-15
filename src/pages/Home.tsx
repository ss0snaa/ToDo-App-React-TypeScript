import { useEffect, useState } from "react";

import TodoCard from "../components/TodoCard";
import AddNewEntry from "../components/AddNewEntry";

import { db, type TodoItem } from "../db/todoDatabase";

const Home = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTodos = async () => {
    setLoading(true);
    try {
      const data = await db.getAllTodos();
      setTodos(data);
    } catch (error) {
      console.error("Ошибка загрузки задач:", error);
    } finally {
      setLoading(false);
    }
  };

  const setCompleted = async (id: number) => {
    try {
      await db.toggleTodo(id);
      loadTodos(); // перезагружаем список
    } catch (error) {
      console.error("Ошибка при обновлении задачи:", error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await db.deleteTodo(id);
      loadTodos()
    } catch (error) {
      console.error("Ошибка удаления задачи:", error);
    }
  };

  const onUpdate = async (id: number, title: string, description: string) => {
    try {
      db.updateTodos(id, { title, description });
      loadTodos();
    } catch (error) {
      console.error("Ошибка обновления задачи:", error);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-stone-900 text-white px-4 py-6">
      <h1 className="text-4xl mb-6 text-yellow-300 text-center">
        My Todo List
      </h1>

      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
        {/* Левая колонка — добавление */}
        <div className="md:w-1/3">
          <AddNewEntry onAddTodo={loadTodos} />
        </div>

        {/* Правая колонка — список */}
        <div className="md:w-2/3 flex flex-col gap-4">
          {loading && (
            <p className="text-center text-stone-400">
              Загрузка задач...
            </p>
          )}

          {!loading && todos.length === 0 && (
            <p className="text-center text-stone-400">
              Задач пока нет. Самое время добавить первую 😏
            </p>
          )}

          {!loading &&
            todos.map((item) => (
              <TodoCard
                key={item.id}
                id={item.id!}
                title={item.title}
                description={item.description ?? ""}
                completed={item.completed}
                onCompleted={setCompleted}
                onDelete={deleteTodo}
                onUpdate={onUpdate}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
