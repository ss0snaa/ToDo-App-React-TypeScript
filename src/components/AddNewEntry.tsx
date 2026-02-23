import { type FormEvent, useState } from 'react';
import { db } from '../db/todoDatabase';
import { Card, CardContent } from './ui/Card';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';

interface AddNewEntryProps {
  onAddTodo?: () => void;
}

const AddNewEntry = ({ onAddTodo }: AddNewEntryProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState<string>('');
  const [loading, setIsLoading] = useState(false);

  const clearEntry = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (title.trim() === '') return;

    setIsLoading(true);

    try {
      await db.addTodo(title, description, priority, dueDate ? new Date(dueDate) : undefined);
      clearEntry();
      onAddTodo?.();
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-cyan-300/15">
      <CardContent className="p-6">
        <h2 className="mb-5 text-lg font-semibold text-white">Новая задача</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400">
              Заголовок
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: Подготовить презентацию"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400">
              Описание
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Добавьте детали задачи"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="priority" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400">
                Приоритет
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                className="h-11 w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 text-sm text-slate-100 outline-none transition-all focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/20"
              >
                <option value="low">Низкий</option>
                <option value="medium">Средний</option>
                <option value="high">Высокий</option>
              </select>
            </div>

            <div>
              <label htmlFor="dueDate" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400">
                Срок
              </label>
              <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button type="submit" size="md" isLoading={loading} disabled={loading || title.trim() === ''}>
              Добавить
            </Button>
            <Button type="button" variant="secondary" size="md" onClick={clearEntry} disabled={loading}>
              Очистить
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddNewEntry;
