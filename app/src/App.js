// it is a react component that is being rendered in the root element of the html file in the public folder of the project directory in the index.html file in the div element with the id of root
import { useState } from "react";
import Header from "./components/Header";
import Todos from "./components/Todo";

const App = () => {

  const [todos, setTodos] = useState([])
  const handleAdd = (todo) => {
    const newTodo = {
      id: todos.length + 1,
      title: todo,
      completed: false
    }
    setTodos([...todos, newTodo])
  }

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  return ( 
    <div>
      <h1>Todo App</h1>

      <Header handleAdd={handleAdd} />
      <Todos handleDelete={handleDelete} todos={todos}  />

    </div>
   );
}
 
export default App;