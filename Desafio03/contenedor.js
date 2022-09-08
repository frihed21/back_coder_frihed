const fs=require('fs');

class Contenedor{
    constructor(path){
        this.path=path
    }
    async save(objeto){
        let txt=await fs.promises.readFile(this.path, "utf-8")
        let arreglo=JSON.parse(txt)
        arreglo.push(Object.assign(objeto,{id:arreglo.length+1}))
        await fs.promises.writeFile('./productos.txt',JSON.stringify(arreglo,null,'\t')) 
        return `Producto ${objeto.nombre} agregado`
    } 
    async getById(id){
        let txt=await fs.promises.readFile(this.path, "utf-8")
        let arreglo=JSON.parse(txt)
        let prod=arreglo.find(el => el.id===id)
        return prod?prod:"Producto no encontrado."
    }
    async getAll(){
        let txt=await fs.promises.readFile(this.path, "utf-8")
        let arreglo=JSON.parse(txt)
        return arreglo.length!==0?arreglo:"No hay productos."
    }
    async deleteById(id){
        let txt=await fs.promises.readFile(this.path, "utf-8")
        let arreglo=JSON.parse(txt)
        let index = arreglo.findIndex(data => data.id === id)
        if(index===id-1){
            arreglo.splice(index, 1)
            await fs.promises.writeFile('./productos.txt',JSON.stringify(arreglo,null,'\t'))
            return "Producto eliminado"
        }
        return "Producto no encontrado."
    }
    async deleteAll(){
        await fs.promises.writeFile('./productos.txt',"[]")
        return "Productos eliminados."
    } 
}

module.exports = Contenedor