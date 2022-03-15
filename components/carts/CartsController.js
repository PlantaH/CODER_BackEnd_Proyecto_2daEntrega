import { Router } from 'express';
import { cartsDao, productsDao } from '../../daos/index.js';

const cartsRouter = new Router();

export default (app) => {
  app.use('/carts', cartsRouter);

  cartsRouter.get('/', async (req, res) => {
    res.json(await cartsDao.getAll());
  });

  cartsRouter.get('/:id', async (req, res) => {
    res.json(await cartsDao.getById(req.params.id));
  });

  cartsRouter.post('/', async (req, res) => {
    res.json(await cartsDao.save(req.body));
  });

  cartsRouter.delete('/', async (req, res) => {
    res.json(await cartsDao.deleteAll());
  });

  cartsRouter.delete('/:id', async (req, res) => {
    res.json(await cartsDao.deleteById(req.params.id));
  });

  // Products in cart
  cartsRouter.post('/:id/products', async (req, res) => {
    const cart = await cartsDao.getById(req.params.id);
    const product = await productsDao.getById(req.body.id);
     
    cart.products.push(product);
    await cartsDao.update(req.params.id, cart);
    res.json(cart);
  });

  cartsRouter.get('/:id/products', async (req, res) => {
    const cart = await cartsDao.getById(req.params.id)
    res.json(cart.products)
  });

  cartsRouter.delete('/:id/products/:productCode', async (req, res)=>{
    const cart = await cartsDao.getById(req.params.id)
    const index = cart.products.findIndex(product => product.code == req.params.productCode)
    if(index !=  -1) {
      cart.products.splice(index, 1)
      await cartsDao.update(req.params.id, cart)
    }
    res.json(cart);
  })
};
 