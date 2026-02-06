import { Square, SquareCheckBig, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Card } from "./ui/Card";
import Button from "./ui/Button";

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

  const handleSave = () => {
    onUpdate(id, editTitle, editDescription);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(title);
    setEditDescription(description);
    setIsEditing(false);
  };

  return (
    <Card className={`transition-all duration-300 ${
      completed
        ? 'bg-stone-800/30 border-green-500/30'
        : 'hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/10'
    }`}>
      <div className="p-4 flex items-start gap-3">
        {/* Чекбокс */}
        <button
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
        </button>

        {/* Контент */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full bg-stone-700/50 text-yellow-200 rounded-lg px-3 py-2 border border-stone-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-base font-medium"
                autoFocus
              />

              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={3}
                className="w-full bg-stone-700/50 text-stone-200 rounded-lg px-3 py-2 border border-stone-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm resize-none"
              />

              <div className="flex gap-2 pt-1">
                <Button
                  size="sm"
                  onClick={handleSave}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-stone-900 hover:from-green-400 hover:to-emerald-400"
                >
                  Сохранить
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleCancel}
                >
                  Отмена
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <h3
                className={`text-base font-semibold ${
                  completed
                    ? "text-green-400 line-through"
                    : "text-yellow-300 group-hover:text-yellow-200"
                }`}
              >
                {title}
              </h3>

              <p
                className={`mt-1 text-sm ${
                  completed
                    ? "text-stone-500 line-through"
                    : "text-stone-300 group-hover:text-stone-200"
                }`}
              >
                {description}
              </p>
            </div>
          )}
        </div>

        {/* Кнопки справа */}
        {!isEditing && (
          <div className="flex flex-col gap-2 flex-shrink-0">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-lg hover:bg-stone-700/50 transition-colors"
              aria-label="Редактировать задачу"
            >
              <Pencil className="w-4 h-4 text-stone-400 hover:text-yellow-300 transition-colors" />
            </button>

            <button
              onClick={() => onDelete(id)}
              className="p-2 rounded-lg hover:bg-red-500/20 transition-colors"
              aria-label="Удалить задачу"
            >
              <Trash2 className="w-4 h-4 text-stone-400 hover:text-red-400 transition-colors" />
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TodoCard;
