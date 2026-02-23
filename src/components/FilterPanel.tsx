import { useState } from 'react';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface FilterPanelProps {
  onSearch: (term: string) => void;
  onDateFilter: (date: string) => void;
  onPriorityFilter: (priority: string) => void;
}

const FilterPanel = ({ onSearch, onDateFilter, onPriorityFilter }: FilterPanelProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setDateFilter(date);
    onDateFilter(date);
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const priority = e.target.value;
    setPriorityFilter(priority);
    onPriorityFilter(priority);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setDateFilter('');
    setPriorityFilter('');
    onSearch('');
    onDateFilter('');
    onPriorityFilter('');
  };

  return (
    <Card className="p-4">
      <h3 className="mb-3 text-sm font-semibold text-white">Фильтры</h3>
      <div className="space-y-3">
        <Input type="text" placeholder="Поиск по задачам..." value={searchTerm} onChange={handleSearchChange} />

        <div className="grid grid-cols-2 gap-3">
          <Input type="date" value={dateFilter} onChange={handleDateChange} />
          <select
            value={priorityFilter}
            onChange={handlePriorityChange}
            className="h-11 w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 text-sm text-slate-100 outline-none transition-all focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/20"
          >
            <option value="">Любой приоритет</option>
            <option value="high">Высокий</option>
            <option value="medium">Средний</option>
            <option value="low">Низкий</option>
          </select>
        </div>

        <Button variant="ghost" onClick={resetFilters} className="w-full border border-white/10">
          Сбросить фильтры
        </Button>
      </div>
    </Card>
  );
};

export default FilterPanel;
