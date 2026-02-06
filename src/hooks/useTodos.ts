import { useCallback } from 'react';
import { db, type TodoItem } from '../db/todoDatabase';
import { useTodoStore } from '../store/todoStore';

// Хук для работы с задачами
export const useTodos = () => {
  const { state, dispatch } = useTodoStore();

  // Загрузка задач
  const loadTodos = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await db.getAllTodos();
      dispatch({ type: 'SET_TODOS', payload: data });
    } catch (error) {
      console.error('Ошибка загрузки задач:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [dispatch]);

  // Добавление задачи
  const addTodo = useCallback(
    async (title: string, description: string, priority: 'low' | 'medium' | 'high' = 'medium', dueDate?: Date) => {
      try {
        const id = await db.addTodo(title, description, priority, dueDate);
        const newTodo = await db.todos.get(id);
        if (newTodo) {
          dispatch({ type: 'ADD_TODO', payload: newTodo });
        }
      } catch (error) {
        console.error('Ошибка при добавлении задачи:', error);
      }
    },
    [dispatch]
  );

  // Обновление задачи
  const updateTodo = useCallback(
    async (id: number, updates: Partial<TodoItem>) => {
      try {
        await db.updateTodos(id, updates);
        dispatch({ type: 'UPDATE_TODO', payload: { id, updates } });
      } catch (error) {
        console.error('Ошибка обновления задачи:', error);
      }
    },
    [dispatch]
  );

  // Удаление задачи
  const deleteTodo = useCallback(
    async (id: number) => {
      try {
        await db.deleteTodo(id);
        dispatch({ type: 'DELETE_TODO', payload: id });
      } catch (error) {
        console.error('Ошибка удаления задачи:', error);
      }
    },
    [dispatch]
  );

  // Переключение статуса задачи
  const toggleTodo = useCallback(
    async (id: number) => {
      try {
        await db.toggleTodo(id);
        dispatch({ type: 'TOGGLE_TODO', payload: id });
      } catch (error) {
        console.error('Ошибка при обновлении задачи:', error);
      }
    },
    [dispatch]
  );

  return {
    todos: state.todos,
    loading: state.loading,
    loadTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  };
};