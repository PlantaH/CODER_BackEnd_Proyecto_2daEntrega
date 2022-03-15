import fs from 'fs'
import path from 'path'
import moment from 'moment';
 
const dataPath = path.resolve(process.env.FILE_CARRITOS)
const dataPathProductos = path.resolve(process.env.FILE_PRODUCTOS)

 
export default class CartContainer {
  getAll = async () => {    
    if (fs.existsSync(dataPath)) {     
      let data = await fs.promises.readFile(dataPath, "utf-8")
      let products = JSON.parse(data)
      if (products) return { status: "success", payload: products }
      return { status: "error", message: "error" }
    }
  };
    
  getById = async (id) => {
    if (!id) return { status: "error", error: "Falta el ID" };
    if (fs.existsSync(dataPath)) {
      let data = await fs.promises.readFile(dataPath, "utf-8");
      let carts = JSON.parse(data);
      let cart = carts.find((c) => c.id === id);
      if (cart) return { status: "success", payload: cart.product };
      else return { status: "error", error: "Null" };
    }
  };

  save = async (cart) => {
    try {
         
        if (fs.existsSync(dataPath)) {
            
          let data = await fs.promises.readFile(dataPath, "utf-8")
          let carts = JSON.parse(data)
           
          let id = carts[carts.length - 1].id + 1
          console.log(id);
          let timestamp = new Date()          
          cart.id = id          
          cart.timestamp = timestamp          
          cart.products = []
          carts.push(cart)

          await fs.promises.writeFile( dataPath, JSON.stringify(carts, null, 2)  )
          return {
            status: "success",
            message: `Carrito grabado id:${cart.id}`,
          };
        } else {
          // el archivo no existe
          let timestamp = new Date();
          cart.id = 1;
          cart.timestamp = timestamp;
          cart.products = [];
  
          await fs.promises.writeFile( dataPath, JSON.stringify([cart], null, 2) );
          return {
            status: "success",
            message: `Carrito grabado id:${cart.id}`,
          };
        }
      } catch (error) {
        return { status: "error", message: error };
      }

  }

  deleteById = async (id) => {
    if (!id) return { status: "error", error: "Falta el ID" };
    if (fs.existsSync(dataPath)) {
       
      let data = await fs.promises.readFile(dataPath, "utf-8");
       
      let carts = JSON.parse(data);
      let cart = carts.find((p) => p.id == id);
      
      if (cart) {
        let newCarts = carts.filter((cart) => cart.id != id);
        await fs.promises.writeFile( dataPath, JSON.stringify(newCarts, null, 2) );
        return { status: "success", message: "Carrito eliminado" };
      } else {
        return { status: "error", error: "No se encontro el carrito" };
      }
    }
  };
   
  update = async (id, newData) => {
    newData.timestamp = moment(new Date()).format('DD/MM/YYYY HH:mm')

    try {
      if (!id || !newData) return { status: "error", error: "missing field" }

      if (fs.existsSync(dataPath)) {
            
            let data = await fs.promises.readFile(dataPath, "utf-8");
            
            let carts = JSON.parse(data)
            let cart = carts.find((p) => p.id == id)
            
            if (cart.id = id) {
                
                let arr = cart.products
                arr.push(newData.products[0].payload)

                cart.products = arr

                await fs.promises.writeFile( dataPath, JSON.stringify(carts, null, 2) );
                
                return { status: "success", message: "Producto agregado" };
            } else {
                return { status: "error", error: "No se encontro el carrito" };
            }
            
            

        } else {
            return { status: "error", error: "No se encontro el carrito" };
        }
       
    } catch (error) {
      return { status: "error", message: error };
    }
  };

  deleteProductById = async (id, prod_id) => {
    if (!id || !prod_id) return { status: "error", error: "missing field" };
    if (fs.existsSync(dataPath)) {
      let data = await fs.promises.readFile(dataPath, "utf-8");
      let carts = JSON.parse(data);
      let cart = carts.find((cart) => cart.id === id);
      if (cart) {
        let cartProd = cart.product.find((prod) => prod === prod_id);
        if (cartProd) {
          let newCart = cart.product.filter((prod) => prod !== prod_id);
          cart.product = newCart;
          await fs.promises.writeFile( dataPath, JSON.stringify(carts, null, 2)
          );
        } else {
          return { status: "error", error: "No se encontro el producto" };
        }
        return { status: "success", message: "Producto eliminado" };
      } else {
        return { status: "error", error: "No se encontro el producto" };
      }
    }
  };
}
