import {type FormEvent, useState} from "react";
import {db} from "../db/todoDatabase";
import { Card, CardContent } from "./ui/Card";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import Button from "./ui/Button";

interface AddNewEntryProps {
  onAddTodo?: () => void;
}

const AddNewEntry = ({onAddTodo}: AddNewEntryProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [dueDate, setDueDate] = useState<string>("");
  const [loading, setIsLoading] = useState(false);

  const clearEntry = () => {
    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (title.trim() === "") return;

    setIsLoading(true);

    try {
      await db.addTodo(title, description, priority, dueDate ? new Date(dueDate) : undefined);
      clearEntry();
      onAddTodo?.(); // Уведомляем родительский компонент о добавлении задачи
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="p-5">
        <h2 className="text-xl font-bold text-center text-yellow-300 mb-4">
          Добавить новую задачу
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="block text-xs font-semibold text-yellow-300 mb-1.5 uppercase tracking-wide">
              Заголовок
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите заголовок задачи"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-xs font-semibold text-yellow-300 mb-1.5 uppercase tracking-wide">
              Описание
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Введите описание задачи"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="priority" className="block text-xs font-semibold text-yellow-300 mb-1.5 uppercase tracking-wide">
                Приоритет
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
                className="w-full bg-stone-800 text-stone-100 rounded-lg border border-stone-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="low">Низкий</option>
                <option value="medium">Средний</option>
                <option value="high">Высокий</option>
              </select>
            </div>

            <div>
              <label htmlFor="dueDate" className="block text-xs font-semibold text-yellow-300 mb-1.5 uppercase tracking-wide">
                Срок выполнения
              </label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <Button
              type="submit"
              size="md"
              isLoading={loading}
              disabled={loading || title.trim() === ''}
              className="col-span-1"
            >
              Добавить
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={clearEntry}
              disabled={loading}
              className="col-span-1"
            >
              Очистить
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default AddNewEntry;