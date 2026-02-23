import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Card } from './ui/Card';
import Button from './ui/Button';
import { CalendarIcon, PencilIcon, SquareCheckIcon, SquareIcon, TrashIcon } from './ui/Icons';

interface TodoCardProps {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  onCompleted: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (
    id: number,
    updates: Partial<{ title: string; description: string; priority: 'low' | 'medium' | 'high'; dueDate?: Date }>
  ) => void;
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
        dueDate: editDueDate ? new Date(editDueDate) : undefined,
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

  const priorityColors = {
    high: 'bg-rose-500/15 text-rose-200 border border-rose-300/20',
    medium: 'bg-amber-500/15 text-amber-200 border border-amber-300/20',
    low: 'bg-emerald-500/15 text-emerald-200 border border-emerald-300/20',
  };

  return (
    <motion.div layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
      <Card
        className={`border transition-all duration-300 ${
          completed
            ? 'border-emerald-300/20 bg-emerald-400/[0.03]'
            : 'border-white/10 bg-white/[0.03] hover:border-cyan-300/30 hover:bg-white/[0.05]'
        }`}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <div className="flex items-start gap-3 p-4">
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => onCompleted(id)}
            className="mt-0.5 shrink-0"
            aria-label={completed ? 'Отметить как невыполненное' : 'Отметить как выполненное'}
          >
            {completed ? (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300 text-slate-900">
                <SquareCheckIcon className="h-4 w-4" />
              </div>
            ) : (
              <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-slate-500 text-slate-500 transition-colors hover:border-cyan-300 hover:text-cyan-200">
                <SquareIcon className="h-4 w-4" />
              </div>
            )}
          </motion.button>

          <div className="min-w-0 flex-1">
            {isEditing ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="h-10 w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 text-sm text-slate-100 outline-none focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/20"
                  autoFocus
                  aria-label="Редактировать заголовок задачи"
                />

                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={3}
                  className="w-full resize-none rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/20"
                  aria-label="Редактировать описание задачи"
                />

                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value as 'low' | 'medium' | 'high')}
                    className="h-10 rounded-xl border border-white/10 bg-slate-900/70 px-3 text-sm text-slate-100 outline-none focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/20"
                  >
                    <option value="low">Низкий</option>
                    <option value="medium">Средний</option>
                    <option value="high">Высокий</option>
                  </select>
                  <input
                    type="date"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                    className="h-10 rounded-xl border border-white/10 bg-slate-900/70 px-3 text-sm text-slate-100 outline-none focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/20"
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <Button size="sm" onClick={handleSave} isLoading={isSaving} disabled={isSaving}>
                    Сохранить
                  </Button>
                  <Button size="sm" variant="secondary" onClick={handleCancel} disabled={isSaving}>
                    Отмена
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className={`text-base font-semibold ${completed ? 'text-emerald-200 line-through' : 'text-slate-100'}`}>
                    {title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-xs ${priorityColors[priority]}`}>
                      {priority === 'high' ? 'Высокий' : priority === 'medium' ? 'Средний' : 'Низкий'}
                    </span>
                    {dueDate && (
                      <div className="flex items-center text-xs text-slate-400">
                        <CalendarIcon className="mr-1 h-3 w-3" />
                        {new Date(dueDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>

                <p className={`mt-1.5 text-sm ${completed ? 'text-slate-500 line-through' : 'text-slate-300'}`}>{description}</p>
              </div>
            )}
          </div>

          {!isEditing && (
            <motion.div className="flex shrink-0 flex-col gap-2" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsEditing(true)}
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-cyan-200"
                aria-label="Редактировать задачу"
              >
                <PencilIcon className="h-4 w-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(id)}
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-rose-500/20 hover:text-rose-200"
                aria-label="Удалить задачу"
              >
                <TrashIcon className="h-4 w-4" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default TodoCard;
