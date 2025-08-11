import TodoList from './components/todo-list/Todo';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Product from './product';
function App() {

  return (
  <Router>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/products" element={<Product />} />
      </Routes>
    </Router>
  );
}

export default App;
