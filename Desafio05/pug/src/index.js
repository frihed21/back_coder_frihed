const express = require("express");
const app = express();
const port = 8080;
const router = express.Router();
const productRouter=require('./routes/products')(router);

app.use('/static', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use('/productos',productRouter)

app.set('views', './src/views');
app.set('view engine', 'pug');

app.get("/*", (req, res) => {
  res.render('pages/error', {})
});

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

server.on('error', (err) => console.log(err));