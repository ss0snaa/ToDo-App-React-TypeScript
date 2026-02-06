import { Plus } from "lucide-react";
import { Card } from "./ui/Card";

const AddNewCard = () => {
  return (
    <Card
      className="
        cursor-pointer transition-all duration-300
        hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/10
        flex flex-col items-center justify-center p-8
        text-center
      "
    >
      <div className="flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-stone-700 flex items-center justify-center mb-3 transition-colors group-hover:bg-yellow-500/20">
          <Plus className="w-6 h-6 text-yellow-400 group-hover:text-yellow-300" />
        </div>
        <h3 className="font-semibold text-stone-300 group-hover:text-stone-200">
          Добавить новую задачу
        </h3>
      </div>
    </Card>
  );
};

export default AddNewCard;
