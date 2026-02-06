import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/Card";
import TodoCard from "../components/TodoCard";
import AddNewEntry from "../components/AddNewEntry";
import { db, type TodoItem } from "../db/todoDatabase";

const Home = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

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
      loadTodos();
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

  // Фильтрация задач в зависимости от выбранного фильтра
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // Подсчет статусов задач
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-stone-900 to-stone-950 text-white px-4 py-6">
      <div className="max-w-6xl w-full mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-500 mb-2">
            My Modern Todo
          </h1>
          <p className="text-stone-400 max-w-md mx-auto">
            Организуйте свои задачи эффективно и достигайте целей
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Левая колонка — добавление */}
          <div className="lg:col-span-1">
            <AddNewEntry onAddTodo={loadTodos} />

            {/* Статистика */}
            <Card className="mt-6">
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-stone-400 mb-2">Статистика</h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-stone-800/50 rounded-lg p-2">
                    <div className="text-yellow-400 font-bold text-lg">{todos.length}</div>
                    <div className="text-xs text-stone-500">Всего</div>
                  </div>
                  <div className="bg-stone-800/50 rounded-lg p-2">
                    <div className="text-amber-400 font-bold text-lg">{activeCount}</div>
                    <div className="text-xs text-stone-500">Активно</div>
                  </div>
                  <div className="bg-stone-800/50 rounded-lg p-2">
                    <div className="text-green-400 font-bold text-lg">{completedCount}</div>
                    <div className="text-xs text-stone-500">Готово</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Правая колонка — список */}
          <div className="lg:col-span-2">
            <Card>
              <div className="p-4 border-b border-stone-700/50">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold text-yellow-300">Задачи</h2>

                  <div className="flex gap-1 bg-stone-800 rounded-lg p-1">
                    <button
                      onClick={() => setFilter('all')}
                      className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                        filter === 'all'
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      Все
                    </button>
                    <button
                      onClick={() => setFilter('active')}
                      className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                        filter === 'active'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      Активные
                    </button>
                    <button
                      onClick={() => setFilter('completed')}
                      className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                        filter === 'completed'
                          ? 'bg-green-500/20 text-green-300'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      Готовые
                    </button>
                  </div>
                </div>
              </div>

              <CardContent className="p-0">
                {loading ? (
                  <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-500"></div>
                  </div>
                ) : filteredTodos.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="mx-auto bg-stone-800/50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <p className="text-stone-500">
                      {filter === 'all'
                        ? 'Задач пока нет. Добавьте первую!'
                        : filter === 'active'
                          ? 'Нет активных задач'
                          : 'Нет завершенных задач'}
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-stone-700/50">
                    {filteredTodos.map((item) => (
                      <div key={item.id} className="first:border-t-0 border-t border-stone-700/50">
                        <TodoCard
                          id={item.id!}
                          title={item.title}
                          description={item.description ?? ""}
                          completed={item.completed}
                          onCompleted={setCompleted}
                          onDelete={deleteTodo}
                          onUpdate={onUpdate}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
