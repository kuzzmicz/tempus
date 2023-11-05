const express = require('express');
const app = express();
const {mongoose} = require('./db/mongoose');
const bodyParser = require('body-parser');
const { List, Task } = require('./db/models');
//CRUD - CREATE READ UPDATE DELETE

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
      return res.status(200).json({});
  };
  next();
});

/*DESC: stworzenie nowej listy zadan, JSON w body requestu
  ENDPOINT: POST localhost:3000/lists
*/
app.post('/lists', (req, res)=>{
    let title = req.body.title;
    let newList = new List({
     title
    });
    newList.save().then((listDoc)=> {
      res.send(listDoc);
    })
})

/*DESC: pobranie listy wszystkich list z bazy danych
  ENDPOINT: GET localhost:3000/lists
*/
app.get('/lists', (req, res)=>{
    List.find({}).then((lists)=>{
        res.send(lists)
      });
})

/*DESC: aktualizacja listy, JSON w body requestu
  ENDPOINT: PATCH localhost:3000/lists/:id
*/
app.patch('/lists/:id', (req, res)=>{
    List.findOneAndUpdate({_id: req.params.id}, {
        $set: req.body
     }).then(()=>{
       res.sendStatus(200);
     });
})

/*DESC:usunięcie listy
  ENDPOINT: DELETE localhost:3000/lists/:id
*/
app.delete('/lists/:id', (req, res)=>{
    List.findOneAndDelete({_id: req.params.id
    }).then((removedListDoc)=>{
       res.send(removedListDoc);
    });
})

/*DESC:pobranie wszystkich zadan z okreslonej listy
  ENDPOINT: GET localhost:3000/lists/listId/tasks
*/
app.get('/lists/:listId/tasks', (req, res)=> {
    Task.find({
        _listId: req.params.listId
    }).then((tasks)=>{
      res.send(tasks);
    })
 })

 /*DESC:stworzenie nowego zadania w okreslonej liscie
  ENDPOINT: POST localhost:3000/lists/listId/tasks
*/
app.post('/lists/:listId/tasks', (req, res)=> {
    let newTask = new Task({
      title: req.body.title,
      _listId: req.params.listId
    });
    newTask.save().then((newTaskDoc)=>{
      res.send(newTaskDoc);
    })
  })
  
  
/*DESC:aktualizacja zadania w okreslonej liscie
  ENDPOINT: PATCH localhost:3000/lists/listId/tasks/taskId
*/
app.patch('/lists/:listId/tasks/:taskId', (req, res)=> {
    Task.findOneAndUpdate({_id: req.params.taskId, _listId: req.params.listId},
      {$set: req.body}).then(()=>{
     res.sendStatus(200);
      })
})
/*DESC:usunięcie zadania w okreslonej liscie
  ENDPOINT: DELETE localhost:3000/lists/listId/tasks/taskId
*/
app.delete('/lists/:listId/tasks/:taskId', (req, res)=>{
  Task.findOneAndDelete({_id: req.params.taskId, _listId: req.params.listId
  }).then((removedTaskDoc)=>{
     res.send(removedTaskDoc);
  });
})

/*DESC:pobranie określonego zadania 
  ENDPOINT: GET localhost:3000/lists/listId/tasks/taskId
*/
app.get('/lists/:listId/tasks/:taskId', (req, res)=> {
    Task.findOne({
        _listId: req.params.listId,
        _id: req.params.taskId
    }).then((task)=>{
      res.send(task);
    })
  })
app.listen(3000, ()=>{
console.log("Server is listening on port 3000");
})