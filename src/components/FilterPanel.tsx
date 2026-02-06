import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface FilterPanelProps {
  onSearch: (term: string) => void;
  onDateFilter: (date: string) => void;
  onPriorityFilter: (priority: string) => void;
}

const FilterPanel = ({ onSearch, onDateFilter, onPriorityFilter }: FilterPanelProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateFilter(e.target.value);
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPriorityFilter(e.target.value);
  };

  const resetFilters = () => {
    onSearch('');
    onDateFilter('');
    onPriorityFilter('');
  };

  return (
    <Card className="p-4 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-semibold text-stone-400 mb-1.5 uppercase tracking-wide">
            Поиск
          </label>
          <Input
            type="text"
            placeholder="Поиск задач..."
            onChange={handleSearchChange}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-400 mb-1.5 uppercase tracking-wide">
            По дате
          </label>
          <Input
            type="date"
            onChange={handleDateChange}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-400 mb-1.5 uppercase tracking-wide">
            Приоритет
          </label>
          <select
            onChange={handlePriorityChange}
            className="w-full bg-stone-800 text-stone-100 rounded-lg border border-stone-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="">Все</option>
            <option value="low">Низкий</option>
            <option value="medium">Средний</option>
            <option value="high">Высокий</option>
          </select>
        </div>

        <div className="flex items-end">
          <Button
            variant="ghost"
            onClick={resetFilters}
            className="w-full"
          >
            Сбросить
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FilterPanel;