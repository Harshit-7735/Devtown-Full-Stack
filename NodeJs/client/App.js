// console.log(React);
// console.log(ReactDOM);


const ele = React.createElement('h1', {}, 'Hello World'); //it is a react element not a dom element 

const domele = document.createElement('div'); // its a dom element that will create a div element in the dom 
// domele.innerHTML = '<h1>Hello World</h1>'; // it will add the h1 element in the div element
// document.body.appendChild(domele); // it will append the div element in the body of the html
// document.body.appendChild(ele); // it will append the react element in the body of the html

const root = document.getElementById('root');
ReactDOM.render(ele, root); // it will render the react element in the root element of the html

// console.log(ele);
// console.log(domele);
