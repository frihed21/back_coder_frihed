const express = require('express')
const router = express.Router()
const Contenedor = require('../contenedor')
const obtenerProductos = new Contenedor("./productos.txt");


router.get('/', (req, res)=> {
    obtenerProductos.getAll().then((result) => res.send(result));
})
router.get("/:id", (req, res) => {
    obtenerProductos.getById(Number(req.params.id))
    .then((result) => result ? res.status(200).send(result) : res.status(404).send({error: "Producto no encontrado"})
      );
  });
router.post('/', (req, res)=> {
    obtenerProductos.save(req.body).then((result) => res.send(result));
    })
router.put('/:id', (req, res)=> {
    obtenerProductos.updateById(req.params.id - 1, req.body)
    .then((result) => result ? res.status(200).send(`El producto id ${req.params.id} fue actualizado`)
    : res.status(404).send({error: "Producto no encontrado"}));
});
router.delete('/:id', (req, res)=> {
    obtenerProductos.deleteById(Number(req.params.id))
    .then((result) => result ? res.status(200).send(`Producto ${req.params.id} eliminado`) : res.status(404).send({error: "Producto no encontrado"})
      );
})

module.exports = router;