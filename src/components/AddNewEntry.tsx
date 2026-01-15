import {type FormEvent, useState} from "react";
import {db} from "../db/todoDatabase";

interface AddNewEntryProps {
  onAddTodo?: () => void;
}

const AddNewEntry = ({onAddTodo}: AddNewEntryProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setIsLoading] = useState(false);

  const clearEntry = () => {
    setTitle("");
    setDescription("");
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (title.trim() === "") return;

    setIsLoading(true);

    try {
      await db.addTodo(title, description);
      clearEntry();
      onAddTodo?.(); // Уведомляем родительский компонент о добавлении задачи
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex-none bg-stone-700 rounded-xl p-4">
      <h2 className="text-xl text-center text-yellow-300 mb-4">Добавить новую задачу</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-yellow-300 mb-1">
            Заголовок
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-stone-800 text-yellow-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-stone-600"
            placeholder="Введите заголовок задачи"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-yellow-300 mb-1">
            Описание
          </label>
          <textarea
            id="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-stone-800 text-yellow-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none border border-stone-600"
            placeholder="Введите описание задачи"
          ></textarea>
        </div>

        <div className="flex space-x-3 pt-2">
          <button
            type="submit"
            className="flex-1 bg-yellow-600 text-stone-900 py-2 px-4 rounded-lg hover:bg-yellow-500
             disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || title.trim() === ''}
          >
            {loading ? 'Добавление...' : 'Добавить'}
          </button>
          <button
            type="button"
            className="flex-1 bg-stone-700 hover:bg-stone-600 text-yellow-300 py-2 px-4 rounded-lg transition-colors duration-200 border border-stone-500"
            onClick={clearEntry}
            disabled={loading}
          >
            Очистить
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewEntry;