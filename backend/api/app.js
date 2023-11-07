const express = require('express');
const app = express();
const {mongoose} = require('./db/mongoose');
const bodyParser = require('body-parser');
const { List, Task, User, Note } = require('./db/models');
//CRUD - CREATE READ UPDATE DELETE



app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

  res.header(
      'Access-Control-Expose-Headers',
      'x-access-token, x-refresh-token'
  );

  next();
});


let verifySession = (req, res, next)=>{
  let refreshToken = req.header('x-refresh-token');
  let _id = req.header('_id');
  User.findByIdAndToken(_id, refreshToken).then((user)=>{
     if(!user){
       return Promise.reject({
         'error': 'User not found.'
       });
     }
     req.user_id = user._id;
     req.userObject = user;
     req.refreshToken = refreshToken;
     let isSessionValid = false;
     user.sessions.forEach((session)=>{
       if(session.token === refreshToken){
         if(User.hasRefreshTokenExpired(session.expiresAt) === false){
             isSessionValid = true;
         }
       }
     });
     if(isSessionValid){
       next();
     }
     else{
         return Promise.reject({
           "error": "Refresh token has expired or the session is invalid"
         })
     }
  }).catch((e)=>{
    res.status(401).send(e);
  })
}

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
        res.send({message: "Updated successfully!"})
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

//NOTATKI
/*DESC: stworzenie nowej notatki, JSON w body requestu
  ENDPOINT: POST localhost:3000/notes
*/
app.post('/notes', (req, res)=>{
  let title = req.body.title;
  let text = req.body.text;
  let newNote = new Note({
   title,
   text
  });
  newNote.save().then((listDoc)=> {
    res.send(listDoc);
  })
})

/*DESC: pobranie listy wszystkich notatek z bazy danych
  ENDPOINT: GET localhost:3000/notes
*/
app.get('/notes', (req, res)=>{
  Note.find({}).then((notes)=>{
      res.send(notes)
    });
})
app.get('/notes/:noteId', (req, res)=> {
  Note.find({
      _noteId: req.params.noteId
  }).then((note)=>{
    res.send(note);
  })
})


//LOGOWANIE
app.post('/users', (req, res)=>{
  let body = req.body;
  let newUser = new User(body);
  newUser.save().then(() => {
    return newUser.createSession();
  }).then((refreshToken)=>{
    return newUser.generateAccessAuthToken().then((accessToken)=>{
      return (accessToken, refreshToken)
    });
  }).then((authTokens) => {
    res  
        .header('x-refresh-token', authTokens.refreshToken)
        .header('x-access-token', authTokens.accessToken)
        .send(newUser);
  }).catch((e)=>{
     res.status(400).send(e);
  })
})


app.post('/users/login', (req, res)=>{
  let email = req.body.email;
  let password = req.body.password;
  User.findByCredentials(email, password).then((user)=>{
    return user.createSession().then((refreshToken)=>{
      return user.generateAccessAuthToken().then((accessToken)=>{
          return (accessToken, refreshToken)
      });
    }).then((authTokens) => {
      res  
        .header('x-refresh-token', authTokens.refreshToken)
        .header('x-access-token', authTokens.accessToken)
        .send(user);
    })
  }).catch((e)=>{
    res.status(400).send(e);
  })
})

app.get('/users/me/access-token', verifySession, (req, res)=>{
  req.userObject.generateAccessAuthToken().then((accessToken)=>{
    res.header('x-access-token', accessToken).send({accessToken});
  }).catch((e)=>{
    res.status(400).send(e);
  })
})

app.listen(3000, ()=>{
console.log("Server is listening on port 3000");
})