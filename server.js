var express = require('express');
var app = express();

var port = process.env.PORT || 3000

app.use(express.static('dist'));

app.get('/api/getchats', function(req, res) {
    console.log("entro: " + req);
   res.json([{id: 1, message: 'Hola como estas'}, {id: 2, message: 'Muy bien'}, {id: 3, message: 'Y para cuando'}]);
});


app.listen(port, function(){
    console.log('servidor en el puerto 3000');
});