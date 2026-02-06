import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "../components/ui/Card";
import TodoCard from "../components/TodoCard";
import AddNewEntry from "../components/AddNewEntry";
import FilterPanel from "../components/FilterPanel";
import { useTodos } from "../hooks/useTodos";

const Home = () => {
  const { todos, loading, loadTodos, toggleTodo, deleteTodo, updateTodo } = useTodos();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  // Фильтрация задач в зависимости от выбранных фильтров
  const filteredTodos = todos.filter(todo => {
    // Фильтр по статусу
    if (filter === 'active' && todo.completed) return false;
    if (filter === 'completed' && !todo.completed) return false;

    // Фильтр по поиску
    if (searchTerm &&
        !todo.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !todo.description?.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Фильтр по дате
    if (dateFilter && todo.dueDate) {
      const todoDate = new Date(todo.dueDate).toISOString().split('T')[0];
      if (todoDate !== dateFilter) return false;
    }

    // Фильтр по приоритету
    if (priorityFilter && todo.priority !== priorityFilter) return false;

    return true;
  });

  // Подсчет статусов задач
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-stone-900 to-stone-950 text-white px-4 py-6">
      <div className="max-w-6xl w-full mx-auto">
        <header className="mb-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-500 mb-2"
          >
            My Modern Todo
          </motion.h1>
          <p className="text-stone-400 max-w-md mx-auto">
            Организуйте свои задачи эффективно и достигайте целей
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Левая колонка — добавление и фильтры */}
          <div className="lg:col-span-1 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <AddNewEntry onAddTodo={loadTodos} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <FilterPanel
                onSearch={setSearchTerm}
                onDateFilter={setDateFilter}
                onPriorityFilter={setPriorityFilter}
              />
            </motion.div>

            {/* Статистика */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-4">
                <h3 className="text-sm font-semibold text-stone-400 mb-3">Статистика</h3>
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
              </Card>
            </motion.div>
          </div>

          {/* Правая колонка — список */}
          <div className="lg:col-span-2">
            <Card>
              <div className="p-4 border-b border-stone-700/50">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold text-yellow-300">Задачи</h2>

                  <div className="flex gap-1 bg-stone-800 rounded-lg p-1">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFilter('all')}
                      className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                        filter === 'all'
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      Все
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFilter('active')}
                      className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                        filter === 'active'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      Активные
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFilter('completed')}
                      className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                        filter === 'completed'
                          ? 'bg-green-500/20 text-green-300'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      Готовые
                    </motion.button>
                  </div>
                </div>
              </div>

              <CardContent className="p-0">
                {loading ? (
                  <div className="flex justify-center items-center h-40">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-10 h-10 border-t-2 border-b-2 border-yellow-500 rounded-full"
                    />
                  </div>
                ) : filteredTodos.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
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
                  </motion.div>
                ) : (
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      layout
                      className="divide-y divide-stone-700/50"
                    >
                      {filteredTodos.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="first:border-t-0 border-t border-stone-700/50"
                        >
                          <TodoCard
                            id={item.id!}
                            title={item.title}
                            description={item.description ?? ""}
                            completed={item.completed}
                            priority={item.priority}
                            dueDate={item.dueDate}
                            onCompleted={toggleTodo}
                            onDelete={deleteTodo}
                            onUpdate={updateTodo}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
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
