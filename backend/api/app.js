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

})

/*DESC:usunięcie listy
  ENDPOINT: DELETE localhost:3000/lists/:id
*/
app.delete('/lists/:id', (req, res)=>{

})

app.listen(3000, ()=>{
console.log("Server is listening on port 3000");
})