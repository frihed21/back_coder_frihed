
const Contenedor= require('./contenedor');
const express = require('express')
const app = express()
const port = 8080
const nuevo= new Contenedor('./productos.txt')

const server = app.listen(8080, () => console.log("Server Running..."));
server.on("Error", (error) => console.log(`Server Error`));

app.get('/', (req, res) => {
    res.send("<h2 style= 'color:black' align = 'center'>Welcome to Express Server</h2>");
    })

app.get('/productos', (req, res) => {
  nuevo.getAll().then(result=>res.send(result))
})

app.get('/productoRandom', (req, res) => {
  nuevo.getAll().then(result=>res.send(result[Math.floor(Math.random() * (result.length))]))
}) 

app.get('/*', (req, res) => {
    res.status(404,).send("<h2 style = 'color:red' align = 'center'>PAGINA NO ENCONTRADA</h2>")
}) 

