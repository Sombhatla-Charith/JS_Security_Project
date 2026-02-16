// var express = require('express');
// var app = express();
// app.get('/', function (req, resp) {
//   resp.send('Welcome to the Rest API');
// });
// app.listen(9000,() => {
//   console.log('API started listening');
// });

// var express= require("express");
// var app=express();
// app.get('/',function(req,resp){
//   resp.send("hello from API");
// });

// app.get('/square/:n',function(req,resp){
//   var n=Number(req.params.n);
//   resp.send(`Square of ${n} is :${n*n}`)
// });
// app.get('/addition/:a/:b',function(req,resp){
//   var a=Number(req.params.a);
//   var b= Number(req.params.b);
//   var c= a+b;
//   resp.send(`Add of ${a} and ${b} is :${c}`);
// });
// app.listen(9000,()=>console.log("API Started listening.."));

// const express = require("express");
// const app = express();

// app.use(express.json()); // to read JSON body

// // In-memory array (acts like DB)
// let users = [
//   { id: 1, name: "Ali", age: 25 },
//   { id: 2, name: "Sara", age: 22 }
// ];


// // ================= CREATE =================
// // POST /users
// app.post("/users", (req, res) => {
//   const newUser = {
//     id: users.length + 1,
//     name: req.body.name,
//     age: req.body.age
//   };

//   users.push(newUser);
//   res.send(newUser);
// });


// // ================= READ =================
// // GET /users
// app.get("/users", (req, res) => {
//   res.send(users);
// });

// // GET /users/:id
// app.get("/users/:id", (req, res) => {
//   const user = users.find(u => u.id == req.params.id);

//   if (!user) return res.status(404).send("User not found");

//   res.send(user);
// });


// // ================= UPDATE =================
// // PUT /users/:id
// app.put("/users/:id", (req, res) => {
//   const user = users.find(u => u.id == req.params.id);

//   if (!user) return res.status(404).send("User not found");

//   user.name = req.body.name;
//   user.age = req.body.age;

//   res.send(user);
// });


// // ================= DELETE =================
// // DELETE /users/:id
// app.delete("/users/:id", (req, res) => {
//   users = users.filter(u => u.id != req.params.id);
//   res.send("User deleted");
// });


// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

/*var express = require('express');
var app = express();

app.get('/', function(request, respond)  {
  respond.send("Hello World!");
});
app.listen(9000,()=> console.log("API Started Listening"));*/


/*var express = require('express');
var app = express();

app.get('/', function(request, respond)  {
  respond.send("Hello World!");
});
app.get('/time',function(request, respond) {
  var time = new Date().toLocaleTimeString();
  respond.send(`Time Is:  + ${time}`);
})
app.get('/date',function(request, respond) {
  var date = new Date().toLocaleDateString();
  respond.send(`Date Is:  + ${date}`);
})
app.listen(9000,()=> console.log("API Started Listening"));*/

/*var express = require('express');
var app = express();

app.get('/', function(request, respond)  {
  respond.send("Hello World!");
});
app.get('/square/:n',function(request, respond) {
  var n = parseInt(request.params.n);
  respond.send(`Square of ${n} is ${n*n}`);
})
app.get('/addition/:a/:b',function(request, respond) {
  var a = Number(request.params.a);
  var b = Number(request.params.b);
  var c = a + b;
  respond.send(`Addition of ${a} and ${b} is ${c}`);
})

app.listen(9000,()=> console.log("API Started Listening"));*/


const express = require('express');
const app = express();
app.use(express.json());//to read json data from request
//in memory array(act like ds) to store users
let users=[
  {id:1, name:"John", age:30},
  {id:2, name:"Jane", age:25},
  {id:3, name:"Doe", age:35}
];
//post /users--insert
app.post('/users', (request, respond) => {

  const newUsers = request.body;

  // Validate if body is an array
  if (!Array.isArray(newUsers)) {
    return respond.status(400).send("Please send an array of users");
  }

  let lastId = users.length > 0 ? users[users.length - 1].id : 0;

  const addedUsers = newUsers.map(user => {
    lastId++;

    const newUser = {
      id: lastId,
      name: user.name,
      age: user.age
    };

    users.push(newUser);
    return newUser;
  });

  respond.status(201).json(addedUsers);
});
//////////////////////read////////////////////////
//get users
app.get("/users",(request, respond) => {
  respond.send(users);
});
//get user by id
app.get("/users/:id",(request, respond) => {
  const user = users.find(u => u.id == request.params.id);
  if (!users) return respond.status(404).send("User Not Found");
  respond.send(user);
});
//////////////////////update////////////////////////
app.put("/users/:id",(request, respond) => {
  const user = users.find(u => u.id == request.params.id);
  if (!users) return respond.status(404).send("User Not Found");
  user.name = request.body.name;
  user.age = request.body.age;
  respond.send(user);
});
//////delet////////
app.delete("/users/:id",(request, respond) => {
  users=users.filter(u => u.id != request.params.id);
  respond.send("User Deleted");
});
app.listen(9000,()=>{
  console.log("API Started Listening");
});