var express = require('express');
var app = express();
var bodyPaser = require('body-parser');
console.log("Hello World");

/middleware 'use'/
app.use((req, res, next)=>{
  console.log(req.method+' '+req.path+" - "+req.ip)
  next();
});

app.use('/public',express.static(__dirname + '/public'));

app.get('/now',(req, res, next)=>{
  req.time= new Date().toString();
  next();
}, function(req, res){
  res.json({'time': req.time});
});

app.use(bodyPaser.urlencoded({extended: 'flase'}));

/route method/
app.get('/',(req,res)=>{
  res.sendFile(__dirname + "/views/index.html");
});

app.get('/json',(req, res)=>{
  if(process.env.MESSAGE_STYLE=="uppercase")
    res.json({"message": "HELLO JSON"});
  else
    res.json({"message": "Hello json"});
});

app.get('/:word/echo',function(req, res){
  res.json({'echo': req.params.word});
});

app.route('/name').get((req, res)=>{
  res.json({'name': req.query.first+' '+req.query.last});
  }).post(function(req, res){
    res.json({'name': req.body.first + ' ' + req.body['last']});
  });

































 module.exports = app;
