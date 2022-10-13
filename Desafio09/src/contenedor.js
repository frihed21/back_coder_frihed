const fs = require("fs");

class Contenedor {
  constructor(path) {
    this.path = path;
  }
  async save(objeto, model) {
    const txt = await fs.promises.readFile(this.path, "utf-8");
    let arreglo = JSON.parse(txt);
    if (model) {
      arreglo.push(
        Object.assign(objeto, { id: arreglo.length + 1, timestamp: Date.now() })
      );
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(arreglo, null, "\t")
      );
      return arreglo[arreglo.length - 1].id;
    }
    return model;
  }
  async getById(id) {
    const txt = await fs.promises.readFile(this.path, "utf-8");
    let arreglo = JSON.parse(txt);
    const prod = arreglo.find((el) => el.id === Number(id));
    return prod ? prod : false;
  }
  async updateById(id, pro) {
    const txt = await fs.promises.readFile(this.path, "utf-8");
    let arreglo = JSON.parse(txt);
    const index = arreglo.findIndex((el) => el.id === Number(id));
    if(typeof(index)){
      arreglo[index] = { ...arreglo[index], ...pro };
      await fs.promises.writeFile(this.path, JSON.stringify(arreglo, null, "\t"));
      return true
    }
    return false;
  }
  async addProductByCart(id, product) {
    const txt = await fs.promises.readFile(this.path, "utf-8");
    let arreglo = JSON.parse(txt);
    const products = arreglo[Number(id) - 1].products;
    if (products && product) {
      arreglo[Number(id) - 1].products = [...products, product];
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(arreglo, null, "\t")
      );
      return true;
    }
    return false;
  }
  async getAll() {
    const txt = await fs.promises.readFile(this.path, "utf-8");
    let arreglo = JSON.parse(txt);
    return arreglo.length !== 0 ? arreglo : [];
  }
  async deleteById(id) {
    const txt = await fs.promises.readFile(this.path, "utf-8");
    let arreglo = JSON.parse(txt);
    const index = arreglo.findIndex((data) => data.id === id);
    if (index === id - 1) {
      arreglo.splice(index, 1);
      for (const x of Array(arreglo.length).keys()) {
        arreglo[x].id = x + 1;
      }
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(arreglo, null, "\t")
      );
      return true;
    }
    return false;
  }
  async deleteAll() {
    await fs.promises.writeFile(this.path, "[]");
    return "Productos eliminados.";
  }
  async deleteProductByCart(id, id_prod) {
    const txt = await fs.promises.readFile(this.path, "utf-8");
    let arreglo = JSON.parse(txt);
    const products = arreglo[Number(id) - 1].products;
    const index = products.findIndex((data) => data.id === Number(id_prod));
    if (products[index]) {
      products.splice(index, 1);
      arreglo[Number(id) - 1].products = products;
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(arreglo, null, "\t")
      );
      return true;
    }
    return false;
  }
}

module.exports = Contenedor;
