const express = require("express");
const app = express();
const port = 8080;
const productRouter=require('./routes/products')

app.use('/static', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended:false}));
app.use('/api/productos',productRouter)

app.get("/*", (req, res) => {
  res.send("Consulta /productos o /productoRandom bro. ");
});

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

server.on('error', (err) => console.log(err));