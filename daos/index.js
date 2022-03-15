import dotenv from 'dotenv';
dotenv.config();

let productsDao
let cartsDao
 
// file
if (`${process.env.BASEDATOS}` === 'file') {
  const { default : ProductsDaoFile } = await import('../components/products/ProductsDaoFile.js')
  const { default : CartsDaoFile } = await import('../components/carts/CartsDaoFile.js')
  productsDao = new ProductsDaoFile()
  cartsDao = new CartsDaoFile()
} 

// mongo
if (`${process.env.BASEDATOS}` === 'mongodb') {
  const { default : ProductsDaoMongo } = await import('../components/products/ProductsDaoMongo.js')
  const { default : CartsDaoMongo } = await import('../components/carts/CartsDaoMongo.js')
  productsDao = new ProductsDaoMongo()
  cartsDao = new CartsDaoMongo()
} 

// firebase
if (`${process.env.BASEDATOS}` === 'firebase') {
  const { default : ProductsDaoFirebase } = await import('../components/products/ProductsDaoFirebase.js')
  const { default : CartsDaoFirebase } = await import('../components/carts/CartsDaoFirebase.js')
  productsDao = new ProductsDaoFirebase()
  cartsDao = new CartsDaoFirebase()
} 


export {productsDao, cartsDao}