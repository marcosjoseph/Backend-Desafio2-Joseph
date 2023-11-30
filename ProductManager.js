const fs = require("fs");

class ProductManager {
        
    constructor () {
        this.path = './productos.json';
    }

    async getProducts () {
        const existsFile = fs.existsSync(this.path);
        const readFile = fs.promises.readFile(this.path, "utf-8");

        if (existsFile) {
            const productosGuardados = await readFile;
            return productosGuardados;
        } else {return products=[];
            }
    }

    async addProduct (product) {
        const productosGuardados = await this.getProducts();
        const writeFile = fs.promises.writeFile(this.path, JSON.stringify(productosGuardados))
        let id;

        if(!productosGuardados.length) {
            id=1;
        } else {id = productosGuardados[productosGuardados.length-1].id+1}

        productosGuardados.push({id,...product})
        await writeFile;
        console.log("El producto se ha agregado")
    }

    async editProduct(idProduct, datoAEditar, nuevoDato) {
        const productosGuardados = await this.getProducts();
        const writeFile = fs.promises.writeFile(this.path, JSON.stringify(productosGuardados));
        const productoAEditar = productosGuardados.find(item=>item.id === idProduct);
        
        if(productoAEditar) {
            productoAEditar[datoAEditar] = nuevoDato;
            await writeFile;
        } else {console.error(`No se ha encontrado el producto con id: ${idProduct}`)}
    }

    async deleteProductById(idProduct) {
        const productosGuardados = await this.getProducts();
        const productosGuardadosNuevo = productosGuardados.filter((item) => item.id === idProduct);
        const writeFile = fs.promises.writeFile(JSON.stringify(productosGuardadosNuevo), this.path)
        
        await writeFile
        console.log(`Se ha eliminado el producto con el id: ${id}`)}
        
    async deleteFile() {
        await fs.promises.unlink(this.path)
        console.log("Se ha eliminado el archivo.")
    }
        
    async getProductById (idProduct) {
        const productosGuardados = await this.getProducts();
        const elProductoExiste = productosGuardados.find((item) => item.id === idProduct);

        if(elProductoExiste) {return elProductoExiste;
        } else {console.error(`El producto id: ${id} no existe`)}
}
}

const product1 = {
    nombre: "Mesa",
    descripcion:"Mesa de Quebracho",
    img:"url imagen",
    precio:400000,
    stock:3,
    code:1000
}

const product2 = {
    nombre: "Banco",
    descripcion:"Banco de Quebracho",
    img:"url imagen",
    precio:100000,
    stock:5,
    code:1001
}

const product3 = {
    nombre: "Espejo",
    descripcion:"Espejo de Quebracho",
    img:"url imagen",
    precio:200000,
    stock:1,
    code:1002
}

async function pruebaFuncional () {
    const productoNuevo = new ProductManager();

    await productoNuevo.addProduct(product2);
    await productoNuevo.addProduct(product3);
    await productoNuevo.addProduct(product1);

    const obtenerProductos = await productoNuevo.getProducts();
    console.log(obtenerProductos);

    const buscarProducto = await productoNuevo.getProductById(1);
    console.log(buscarProducto);

    const editarProducto = await productoNuevo.editProduct(2,nombre,"banco de quebracho");
    console.log(editarProducto);

    const borrarProducto = await productoNuevo.deleteProductById(1);
    console.log(borrarProducto);

    const borrarArchivo = await productoNuevo.deleteFile();
    console.log (borrarArchivo)
}

pruebaFuncional();



// console.log(productoNuevo);

// productoNuevo.addProduct("Mesa", "Mesa de Quebracho", "Url Imagen", 400000, 3, 1000);

// productoNuevo.addProduct("Banco", "Banco de Quebracho", "Url Imagen", 100000, 10,1001);

// productoNuevo.addProduct("Banco2", "Banco de Quebracho", "Url Imagen", 100000, 10,1001);

// productoNuevo.addProduct("Estante", "Url Imagen", 60000, 5);

// console.log(productoNuevo);

// console.log(productoNuevo.getProductById(2))
