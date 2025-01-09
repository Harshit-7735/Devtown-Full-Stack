const Todos = ({ todos , handleDelete}) => {
  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          <p>{todo.title}</p>
          <button onClick={() => handleDelete(todo.id)}>x</button>
        </div>
      ))}
    </div>
  );
}
export default Todos;