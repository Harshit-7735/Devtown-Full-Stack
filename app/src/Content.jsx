import { useState } from "react";

const Content = () => {
  /* useState is a hook that allows you to have state variables in functional components. You pass the initial
  value to the useState function and it returns the current state value and the function that lets you update it.
  // let count =0;
  let [count, setCount] = useState(0); // in the array the first element is the value and the second element is the function that will be used to update the value

  const increment = (e) => {
    count++;
    // console.log(count,setCount);
    setCount((prevCount) => prevCount + 1); // this is the function that will be used to update the value
  };

  const decrement = (e) => {
    count--;

    setCount(count);
  };

  const reset = (e) => {
    count = 0;
    setCount(count);
  };
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );

*/

  // CREATION OF A TODO LIST

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState(""); // this will be used to store the value of the input field

  const handleChange = (e) => {
    // this function will be used to handle the change event of the input field
    setInput(e.target.value); // this will set the value of the input field to the value that the user types
  };

  const addTodo = (e) => {
    setTodos([...todos, input]); // this will add the value of the input field to the todos array
    setInput(""); // this will clear the input field after the value has been added to the todos array
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div>
      <h4>{todos.length > 0 ? "No Todos" : "Add Todos"}</h4>
      <input value={input} onChange={handleChange} type="text" />
      <button onClick={addTodo}>Add Todo</button>
      <div>
        {todos.map((todo, index) => (
          <li>
            {todo} <button onClick={deleteTodo}>Delete</button>
          </li>
        ))}
      </div>
    </div>
  );
};
export default Content;
