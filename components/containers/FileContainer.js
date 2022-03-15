import fs from 'fs';
import path from 'path'

const dataPath = path.resolve(process.env.FILE_PRODUCTOS)

 
export default class FileContainer {
  getAll = async () => {
    if (fs.existsSync(dataPath)) {      
      let data = await fs.promises.readFile(dataPath, "utf-8")
      let products = JSON.parse(data)
      if (products) return { status: "success", payload: products }
      return { status: "error", message: "error" }
    }
  };
    
  getById = async (id) => {
    if (!id) return { status: "error", error: "Falta ID" }
    if (fs.existsSync(dataPath)) {      
      let data = await fs.promises.readFile(dataPath, "utf-8")
      let products = JSON.parse(data)
      let product = products.find((p) => p.id == id)
      if (product) 
        return { status: "success", payload: product }
      else 
        return { status: "error", error: "Null" }
    }
  };

  save = async (product) => {
    if (!product.name || !product.description || !product.code || !product.img || !product.price || !product.stock ) return { status: "error", error: "faltan campos" }

    try {
      if (fs.existsSync(dataPath)) {
        let data = await fs.promises.readFile(dataPath, "utf-8")
        let products = JSON.parse(data)
        let id = products[products.length - 1].id + 1
        let timestamp = new Date()
        product.id = id
        product.timestamp = timestamp
        product.code = product.id + timestamp.getTime()
        products.push(product)

        await fs.promises.writeFile(dataPath,JSON.stringify(products, null, 2))

        return { status: "success", message: `Producto guardado ID:${product.id}` }
      } else {        
        let timestamp = new Date()
        product.id = 1
        product.timestamp = timestamp
        product.code = product.id + timestamp.getTime()
        
        await fs.promises.writeFile(pathToProducts, JSON.stringify([product], null, 2))

        return { status: "success", message: `Product guardado ID:${product.id}` }
      }
    } catch (error) {
      return { status: "error", message: error }
    }
  }

  deleteById = async (id) => {
    if (!id) return { status: "error", error: "Falta ID" }
    
    if (fs.existsSync(dataPath)) {
      let data = await fs.promises.readFile(dataPath, "utf-8")
      let products = JSON.parse(data)
      
      let productExist = products.find((p) => p.id == id)
      if (productExist) {
        let newProducts = products.filter(e => e.id != id)  
         
        await fs.promises.writeFile(dataPath,JSON.stringify(newProducts, null, 2))

        return { status: "success", message: "Producto eliminado" }
      } else {
        return { status: "error", error: "No se encontro el producto" }
      }
    }
  };
  
  update = async (id, product) => {
    if ( !product.name || !product.description || !product.code || !product.img || !product.price || !product.stock ) return { status: "error", error: "missing field" }
    
    try {
      if (fs.existsSync(dataPath)) {
         
        let data = await fs.promises.readFile(dataPath, "utf-8")
        let products = JSON.parse(data)

        let productExist = products.find((p) => p.id == id);
       
        if (!productExist) {
          return { status: "error", message: "No se encontro el producto" }
        } else {
          
          let id = productExist.id
          let code = productExist.code;
          let timestamp = new Date()
          product.id = id
          product.code = code
          product.timestamp = timestamp
          
          let index = products.findIndex((p) => p.id == id)
          
          products[index] = product
          await fs.promises.writeFile(dataPath,JSON.stringify(products, null, 2))
          
          return { status: "success", message: `Producto modificado ID:${product.id}` };
        }
      } else {
        return { status: "error", message: "No se encontro el producto" }
      }
    } catch (error) {
      return { status: "error", message: error }
    }
  };
 
}