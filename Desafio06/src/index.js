const express = require("express");
const app = express();
const port = process.env.PORT||8080;
const router = express.Router();
const { engine } = require("express-handlebars");
const productRouter = require("./routes/products")(router);
const { Server } = require("socket.io");
const Contenedor = require("./contenedor");
const chat = new Contenedor("./chat.txt");
const products= new Contenedor("./newProducts.txt");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/productos", productRouter);
app.use(express.static("public"));
app.set("views", "./src/views");
app.set("view engine", "hbs");

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);

app.get("/*", (req, res) => {
  res.render("pages/home", {});
});

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const io = new Server(server);

io.on("connection", async (socket) => {
  console.log(`Client ${socket.id} connected`);
  socket.broadcast.emit("newUserNotification");
  socket.emit("history", await chat.getAll());
  socket.emit("historyProducts", await products.getAll());
  socket.on("message", async (data) => {
    await chat.save(data);
    io.emit("history", await chat.getAll());
  });
  socket.on("productL", async (data) => {
    console.log(data)
    await products.save(data);
    io.emit("historyProducts", await products.getAll());
  });
  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected`);
  });
});
server.on("error", (err) => console.log(err));
