var express = require('express');
var app = express();

app.use(express.static('dist'));


app.listen(3000, function(){ 
    console.log('servidor en el puerto 3000');
});