//Połączenie do bazy mongoDB

const mongoose = require('mongoose');
mongoose.Promise = global.Promise; 
mongoose.connect('mongodb+srv://myAtlasDBUser:Cleanmasha@myatlasclusteredu.ewny6oj.mongodb.net/', { useNewUrlParser: true}).then(()=>{
console.log("Connected to MongoDb!");
}).catch((e)=>{
console.log("Error!");
console.log(e);
});


module.exports = {
 mongoose 
};