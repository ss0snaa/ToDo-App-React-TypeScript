import { CirclePlus } from "lucide-react";

const AddNewCard = () => {
  return (
    <div
      className="
        group bg-stone-700 rounded-xl min-h-[100px]
        hover:bg-yellow-600 hover:shadow-md hover:shadow-yellow-500
        cursor-pointer transition-all duration-200
        flex items-center justify-center p-4
        transform hover:scale-105
      "
    >
      <CirclePlus
        size={48}
        className="text-yellow-500 group-hover:text-white transition-colors duration-200"
      />
    </div>
  );
};

export default AddNewCard;
