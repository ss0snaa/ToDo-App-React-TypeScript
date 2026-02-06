import Home from './pages/Home';
import { TodoProvider } from './store/todoStore';

function App() {
  return (
    <TodoProvider>
      <Home />
    </TodoProvider>
  );
}

export default App;
