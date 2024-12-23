// it is a react component that is being rendered in the root element of the html file in the public folder of the project directory in the index.html file in the div element with the id of root

import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

// const App = () => {

//   const tasks = ['task1', 'task2', 'task3', 'task4', 'task5'];
//   const age=10;
 
//   return (

//     <div>
//       <h1>Task List</h1>
//       <h2>{age}</h2>
//       {
//       tasks.map((task,index) =>{
// return <p>{task}</p>
//  })
//       }
//     </div>
//   );
// };

// export default App;







const App = () =>{
  return (
    <div>
      <Header/>
      <Content/>
      <Footer/>
    </div>
  );

}

export default App;