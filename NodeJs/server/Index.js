const express = require("express");
const fs = require("fs/promises");
const { parse } = require("path");
// console.log(express);

// create an express server

const PORT = 8080;
const app = express();

// create a route
app.get("/", (req, res) => {
  // we can get headers, body, query params, path params
  const { headers, body, query, params } = req;
  console.log({
    headers,
    body,
    query,
    params,
  });

  res.send("Hello World");
});


// create a todo route
app.get('/todo',async(req,res)=>{
    try {
        const todos = await fs.readFile('./db.json','utf-8');
        // console.log(todos);
        parsedTodos = JSON.parse(todos);
        res.status(200).send(parsedTodos.slice(0,5));
        
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
        
    }
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
