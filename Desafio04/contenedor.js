const fs = require("fs");
const pathToFile = './productos.txt';

class Contenedor {
	createProduct = async (producto) => {
		if (!producto.title || !producto.price || !producto.thumbnail)
			return {
				status: 'error',
				message: 'no se han ingresado todos los campos',
			};
		try {
			if (fs.existsSync(pathToFile)) {
				let txt = await fs.promises.readFile(pathToFile, 'utf-8');
				let productos = JSON.parse(txt);
				let id = productos[productos.length - 1].id + 1;
				producto.id = id;
				productos.push(producto);
				await fs.promises.writeFile(
					pathToFile,
					JSON.stringify(productos, null, 2)
				);
				return {
					status: 'success',
					message: `Product ${producto.title} added successfully`,
				};
			} else {
				producto.id = 1;
				await fs.promises.writeFile(
					pathToFile,
					JSON.stringify([producto], null, 2)
				);
				return {
					status: 'success',
					message: `Product ${producto.title} added successfully`,
				};
			}
		} catch (err) {
			return { status: 'error', message: err.message };
		}
	};

	getById = async (id) => {
		if (!id) return { status: 'error', message: 'favor ingresar ID' };
		if (fs.existsSync(pathToFile)) {
			let txt = await fs.promises.readFile(pathToFile, 'utf-8');
			let productos = JSON.parse(txt);
			let producto = productos.find((producto) => producto.id === id);
			if (producto) return { status: 'success', message: producto };
			return { status: 'error', message: 'null' };
		} else {
			return { status: 'error', message: err.message };
		}
	};

	getAll = async () => {
		try {
			if (fs.existsSync(pathToFile)) {
				let txt = await fs.promises.readFile(pathToFile, 'utf-8');
				let productos = JSON.parse(txt);
				return { status: 'success', message: productos };
			} else {
				return { status: 'error', message: err.message };
			}
		} catch (err) {
			return { status: 'error', producto: error.message };
		}
	};

	deleteById = async (id) => {
		if (!id) return { status: 'error', message: 'favor ingresar ID' };
		if (fs.existsSync(pathToFile)) {
			let txt = await fs.promises.readFile(pathToFile, 'utf-8');
			let productos = JSON.parse(txt);
			let newProductos = productos.filter((producto) => producto.id !== id);
			await fs.promises.writeFile(
				pathToFile,
				JSON.stringify(newProductos, null, 2)
			);
			return { status: 'success', message: 'Producto eliminado satisfactoriamente' };
		} else {
			return { status: 'error', message: err.message };
		}
	};

	deleteAll = async () => {
		if (fs.existsSync(pathToFile)) {
			let txt = await fs.promises.readFile(pathToFile, 'utf-8');
			let productos = JSON.parse(txt);
			let newProductos = productos.filter((producto) => producto.length);
			await fs.promises.writeFile(
				pathToFile,
				JSON.stringify(newProductos, null, 2)
			);
			return { status: 'success', message: 'Productos eliminados satisfactoriamente' };
		} else {
			return { status: 'error', message: err.message };
		}
	};
	updateById = (id, productos) => {
		id = parseInt(id);
		let newProductos = productos.map((item) => {
			if (item.id === id) {
				return { id, ...productos };
			} else return item;
		});
		productos = newProductos;
		return this.getById(id);
	};
}
module.exports = Contenedor;