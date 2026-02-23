import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../components/ui/Card';
import TodoCard from '../components/TodoCard';
import AddNewEntry from '../components/AddNewEntry';
import FilterPanel from '../components/FilterPanel';
import { useTodos } from '../hooks/useTodos';

const Home = () => {
  const { todos, loading, loadTodos, toggleTodo, deleteTodo, updateTodo } = useTodos();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active' && todo.completed) return false;
    if (filter === 'completed' && !todo.completed) return false;

    if (
      searchTerm &&
      !todo.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !todo.description?.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    if (dateFilter && todo.dueDate) {
      const todoDate = new Date(todo.dueDate).toISOString().split('T')[0];
      if (todoDate !== dateFilter) return false;
    }

    if (priorityFilter && todo.priority !== priorityFilter) return false;

    return true;
  });

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#060816] px-4 py-8 text-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-0 top-28 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-cyan-200 via-sky-300 to-indigo-300 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
          >
            Focus Flow Tasks
          </motion.h1>
          <p className="mt-2 max-w-xl text-slate-400">Современный workspace для ваших задач: быстро, красиво и без перегрузки.</p>
        </header>

        <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Card className="p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">Всего задач</p>
            <p className="mt-2 text-3xl font-semibold text-cyan-200">{todos.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">В работе</p>
            <p className="mt-2 text-3xl font-semibold text-amber-200">{activeCount}</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs uppercase tracking-wide text-slate-400">Выполнено</p>
            <p className="mt-2 text-3xl font-semibold text-emerald-200">{completedCount}</p>
          </Card>
        </section>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_1fr]">
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <AddNewEntry onAddTodo={loadTodos} />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <FilterPanel onSearch={setSearchTerm} onDateFilter={setDateFilter} onPriorityFilter={setPriorityFilter} />
            </motion.div>
          </div>

          <Card className="overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-4 sm:p-5">
              <h2 className="text-lg font-semibold text-slate-100">Задачи</h2>

              <div className="flex gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1">
                {[
                  { key: 'all', label: 'Все' },
                  { key: 'active', label: 'Активные' },
                  { key: 'completed', label: 'Готовые' },
                ].map((item) => (
                  <motion.button
                    key={item.key}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setFilter(item.key as 'all' | 'active' | 'completed')}
                    className={`rounded-lg px-3 py-1.5 text-xs transition-colors ${
                      filter === item.key ? 'bg-cyan-300/20 text-cyan-100' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </div>

            <CardContent className="p-4 sm:p-5">
              {loading ? (
                <div className="flex h-40 items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="h-10 w-10 rounded-full border-y-2 border-cyan-300"
                  />
                </div>
              ) : filteredTodos.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-500">
                    ✓
                  </div>
                  <p className="text-slate-400">
                    {filter === 'all' ? 'Пока пусто — добавьте первую задачу.' : filter === 'active' ? 'Нет активных задач.' : 'Нет завершённых задач.'}
                  </p>
                </motion.div>
              ) : (
                <AnimatePresence mode="popLayout">
                  <motion.div layout className="space-y-3">
                    {filteredTodos.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.2 }}
                      >
                        <TodoCard
                          id={item.id!}
                          title={item.title}
                          description={item.description ?? ''}
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
  );
};

export default Home;
