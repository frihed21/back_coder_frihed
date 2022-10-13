const Contenedor = require("../contenedor.js");
const Producto = require("../model/product");
const nuevo = new Contenedor("./productos.json");

module.exports = function (router) {

  router.get("/", async (req, res) => {
    const productos = await nuevo.getAll();
    res.status(200).json(productos);
  });

  router.get("/:id", async (req, res) => {
    const producto = await nuevo.getById(req.params.id);
    producto
      ? res.status(200).json(producto)
      : res
          .status(400)
          .json({ error: "Ocurrió un error al encontrar el producto." });
  });


  router.post("/", async (req, res) => {
    const { body } = req;
    (await nuevo.save(body, Producto(body)))
      ? res.status(200).send({ success: "Producto actualizado." })
      : res
          .status(404)
          .send({ error: "Ocurrió un error al encontrar el producto." });
   
  });

  router.put("/:id", async (req, res) => {
    const productUpdated = await nuevo.updateById(req.params.id, req.body);
    if(Producto(req.body)){
      productUpdated
        ? res.status(200).send({ success: "Producto actualizado." })
        : res
            .status(404)
            .send({ error: "Ocurrió un error al encontrar el producto." });
        return
    }
    res
      .status(404)
      .send({ error: "Ocurrió un error al actualizar el producto." });
  });

  router.delete("/:id", async (req, res) => {
    const productDeleted = await nuevo.deleteById(Number(req.params.id));
    productDeleted
      ? res.status(200).send({ success: "Producto eliminado." })
      : res
          .status(404)
          .send({ error: "Ocurrió un error al encontrar el producto." });
  });

  router.get("/*", async (req, res) => {
    res.status(404).json({
      error: -2,
      descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`,
    });
  });

  return router;
};
