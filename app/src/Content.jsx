const Content =()=>{
    const tasks = ['task1', 'task2', 'task3', 'task4', 'task5'];
    return (
      <div>
        {
        tasks.map((task,index) =>{
  return <p>{task}</p>
  
    })
        }
      </div>
    );  
  }

  export default Content;