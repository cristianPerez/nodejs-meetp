import express from 'express';
const app = express();
const port = process.env.PORT || 3000

app.use(express.static('dist'));

app.get('/api/getchats', (req, res) => {
    console.log("entro: " + req);
   res.json([{id: 1, message: 'Hola como estas'}, {id: 2, message: 'Muy bien'}, {id: 3, message: 'Y para cuando'}]);
});

app.listen(port, () => console.log('servidor en el puerto 3000'));