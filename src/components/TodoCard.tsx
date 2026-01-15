import { Square, SquareCheckBig, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

interface TodoCardProps {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  onCompleted: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string, description: string) => void;
}

const TodoCard = ({
  id,
  title,
  description,
  completed,
  onCompleted,
  onDelete,
  onUpdate,
}: TodoCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);

  return (
    <div
      className="group bg-stone-700 rounded-xl p-4 flex
      hover:bg-yellow-600 hover:shadow-md hover:shadow-yellow-500
      transition-colors duration-200"
    >
      {/* Чекбокс */}
      <button
        onClick={() => onCompleted(id)}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-600/50 transition-colors duration-200"
      >
        {completed ? (
          <SquareCheckBig className="w-5 h-5" />
        ) : (
          <Square className="w-5 h-5" />
        )}
      </button>

      {/* Контент */}
      {isEditing ? (
        <div className="flex-1 min-w-0 px-2 space-y-2">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full bg-stone-800 text-yellow-200 rounded px-2 py-1 border border-stone-600"
          />

          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            rows={2}
            className="w-full bg-stone-800 text-yellow-200 rounded px-2 py-1 border border-stone-600 resize-none"
          />

          <div className="flex gap-3">
            <button
              onClick={() => {
                onUpdate(id, editTitle, editDescription);
                setIsEditing(false);
              }}
              className="text-sm text-slate-600 hover:text-white bg-yellow-300 hover:bg-stone-600 rounded-xl p-2"
            >
              Сохранить
            </button>

            <button
              onClick={() => {
                setEditTitle(title);
                setEditDescription(description);
                setIsEditing(false);
              }}
              className="text-sm text-stone-400 hover:text-stone-300 bg-stone-600 rounded-xl p-2"
            >
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 min-w-0 px-2">
          <h1
            className={`text-3xl text-yellow-300 group-hover:text-white transition-all duration-200 truncate ${
              completed ? "line-through opacity-70" : ""
            }`}
          >
            {title}
          </h1>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent my-2" />

          <p
            className={`text-sm text-stone-200 group-hover:text-white ${
              completed ? "line-through opacity-60" : ""
            }`}
          >
            {description}
          </p>
        </div>
      )}

      {/* Кнопки справа */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-600/50 transition-colors duration-200"
        >
          <Pencil className="text-yellow-300 group-hover:text-white w-5 h-5" />
        </button>

        <button
          onClick={() => onDelete(id)}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-600/50 transition-colors duration-200"
        >
          <Trash2 className="text-red-400 group-hover:text-red-300 w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
