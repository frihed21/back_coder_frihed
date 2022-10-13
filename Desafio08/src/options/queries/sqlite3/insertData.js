const options = require("../../sqlite3.config");
const knex = require("knex");

const database = knex(options);

const productos = [
 {
    timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
    nombre: "Birds",
    precio: 130,
    descripcion: "Pintura en acrilico y acuarela pasteles",
    codigo: "FR-6",
    foto: "birdsurl06.com",
    stock: 15,
  },
  {
    timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
    nombre: "Elephantgroup",
    precio: 150,
    descripcion: "Pintura en acrilico y acuarela pasteles",
    codigo: "FR-7",
    foto: "elephantfr34.com",
    stock: 27;
  },
  {
    timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
    nombre: "Bees",
    precio: 110,
    descripcion: "Pintura en acrilico y acuarela pasteles",
    codigo: "FR-8",
    foto: "beesfr2.com",
    stock: 13,
  },
  {
    timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
    nombre: "Butterflypink",
    precio: 90,
    descripcion: "Pintura en acrilico y acuarela pasteles",
    codigo: "XY-9",
    foto: "butterflyfr23.com",
    stock: 35,
  },
];

database("products")
  .insert(productos)
  .then(console.log("Productos añadidosssss"))
  .catch((err) => console.log(err))
  .finally(() => database.destroy());
