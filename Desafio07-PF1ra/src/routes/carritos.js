const Contenedor = require("../contenedor.js");
const Carrito = require("../model/carrito");
const nuevo = new Contenedor("./carrito.json");
const productos = new Contenedor("./productos.json");

module.exports = function (router) {

  router.get("/", async (req, res) => {
    const productos = await nuevo.getAll();
    res.status(200).json(productos);
  });

  router.get("/:id/productos", async (req, res) => {
    const producto = await nuevo.getById(req.params.id);
    producto
      ? res.status(200).json(producto.products)
      : res
          .status(400)
          .json({ error: "Ocurrió un error al encontrar el producto." });
  });

  router.post("/", async (req, res) => {
    const { body } = req;
    const bodyID = await nuevo.save(body, Carrito(body));
    if (bodyID) {
      res
        .status(200)
        .send({ success: `Carrito actualizado con ID: ${bodyID}` });
    }
    res
      .status(404)
      .send({ error: "Ocurrió un error al encontrar el producto." });
  });

  router.post("/:id/productos", async (req, res) => {
    const product = await productos.getById(req.body.id);
    (await nuevo.addProductByCart(req.params.id, product))
      ? res.status(200).send({ success: `Carrito actualizado con ID:` })
      : res
          .status(404)
          .send({ error: "Ocurrió un error al encontrar el producto." });
  });

  router.delete("/:id", async (req, res) => {
    const productDeleted = await nuevo.deleteById(Number(req.params.id));
    productDeleted
      ? res.status(200).send({ success: "Carrito eliminado." })
      : res
          .status(404)
          .send({ error: "Ocurrió un error al encontrar el producto." });
  });

  router.delete(
    "/:id/productos/:id_prod",
    async (req, res) => {
      (await nuevo.deleteProductByCart(req.params.id, req.params.id_prod))
        ? res.status(200).send({ success: `Carrito actualizado con ID:` })
        : res
            .status(404)
            .send({ error: "Ocurrió un error al encontrar el producto." });
    }
  );

  router.get("/*", async (req, res) => {
    res.status(404).json({
      error: -2,
      descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`,
    });
  });

  return router;
};
