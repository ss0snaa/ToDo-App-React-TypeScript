import { motion } from "framer-motion";
import { Square, SquareCheckBig, Pencil, Trash2, Calendar, Flag } from "lucide-react";
import { useState, useEffect } from "react";
import { Card } from "./ui/Card";
import Button from "./ui/Button";

interface TodoCardProps {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  onCompleted: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, updates: Partial<{ title: string; description: string; priority: 'low' | 'medium' | 'high'; dueDate?: Date }>) => void;
}

const TodoCard = ({
  id,
  title,
  description,
  completed,
  priority,
  dueDate,
  onCompleted,
  onDelete,
  onUpdate,
}: TodoCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [editPriority, setEditPriority] = useState<'low' | 'medium' | 'high'>(priority);
  const [editDueDate, setEditDueDate] = useState<string>(dueDate ? new Date(dueDate).toISOString().split('T')[0] : '');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setEditTitle(title);
      setEditDescription(description);
      setEditPriority(priority);
      setEditDueDate(dueDate ? new Date(dueDate).toISOString().split('T')[0] : '');
    }
  }, [isEditing, title, description, priority, dueDate]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onUpdate(id, {
        title: editTitle,
        description: editDescription,
        priority: editPriority,
        dueDate: editDueDate ? new Date(editDueDate) : undefined
      });
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(title);
    setEditDescription(description);
    setEditPriority(priority);
    setEditDueDate(dueDate ? new Date(dueDate).toISOString().split('T')[0] : '');
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  // Определение цвета приоритета
  const priorityColors = {
    high: 'text-red-400 bg-red-500/20',
    medium: 'text-amber-400 bg-amber-500/20',
    low: 'text-green-400 bg-green-500/20'
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={`transition-all duration-300 ${
          completed
            ? 'bg-stone-800/30 border-green-500/30'
            : 'hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/10'
        }`}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <div className="p-4 flex items-start gap-3">
          {/* Чекбокс */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCompleted(id)}
            className="flex-shrink-0 mt-0.5"
            aria-label={completed ? "Отметить как невыполненное" : "Отметить как выполненное"}
          >
            {completed ? (
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
                <SquareCheckBig className="w-4 h-4 text-white" />
              </div>
            ) : (
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-stone-500 hover:border-yellow-400 transition-colors">
                <Square className="w-4 h-4 text-transparent" />
              </div>
            )}
          </motion.button>

          {/* Контент */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-stone-700/50 text-yellow-200 rounded-lg px-3 py-2 border border-stone-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-base font-medium"
                  autoFocus
                  aria-label="Редактировать заголовок задачи"
                />

                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-stone-700/50 text-stone-200 rounded-lg px-3 py-2 border border-stone-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm resize-none"
                  aria-label="Редактировать описание задачи"
                />

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-stone-400 mb-1">Приоритет</label>
                    <select
                      value={editPriority}
                      onChange={(e) => setEditPriority(e.target.value as 'low' | 'medium' | 'high')}
                      className="w-full bg-stone-700/50 text-stone-200 rounded-lg px-3 py-2 border border-stone-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                    >
                      <option value="low">Низкий</option>
                      <option value="medium">Средний</option>
                      <option value="high">Высокий</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-stone-400 mb-1">Срок</label>
                    <input
                      type="date"
                      value={editDueDate}
                      onChange={(e) => setEditDueDate(e.target.value)}
                      className="w-full bg-stone-700/50 text-stone-200 rounded-lg px-3 py-2 border border-stone-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <Button
                    size="sm"
                    onClick={handleSave}
                    isLoading={isSaving}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-stone-900 hover:from-green-400 hover:to-emerald-400"
                  >
                    Сохранить
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleCancel}
                    disabled={isSaving}
                  >
                    Отмена
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-start">
                  <h3
                    className={`text-base font-semibold ${
                      completed
                        ? "text-green-400 line-through"
                        : "text-yellow-300"
                    }`}
                  >
                    {title}
                  </h3>

                  <div className="flex gap-1.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[priority]}`}>
                      {priority === 'high' ? 'Важно' : priority === 'medium' ? 'Средне' : 'Низко'}
                    </span>

                    {dueDate && (
                      <div className="flex items-center text-xs text-stone-400">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(dueDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>

                <p
                  className={`mt-1 text-sm ${
                    completed
                      ? "text-stone-500 line-through"
                      : "text-stone-300"
                  }`}
                >
                  {description}
                </p>
              </motion.div>
            )}
          </div>

          {/* Кнопки справа */}
          {!isEditing && (
            <motion.div
              className="flex flex-col gap-2 flex-shrink-0"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsEditing(true)}
                className="p-2 rounded-lg hover:bg-stone-700/50 transition-colors"
                aria-label="Редактировать задачу"
              >
                <Pencil className="w-4 h-4 text-stone-400 hover:text-yellow-300 transition-colors" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(id)}
                className="p-2 rounded-lg hover:bg-red-500/20 transition-colors"
                aria-label="Удалить задачу"
              >
                <Trash2 className="w-4 h-4 text-stone-400 hover:text-red-400 transition-colors" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default TodoCard;
