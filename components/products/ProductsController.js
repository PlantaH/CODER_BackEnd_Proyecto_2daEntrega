import { Router } from 'express';
import { productsDao } from '../../daos/index.js';

const productsRouter = new Router();

export default (app) => {
  app.use('/products', productsRouter)

  productsRouter.get('/', async(req,res)=>{
    res.json(await productsDao.getAll())
  })

  productsRouter.get('/:id', async (req, res) => {
    res.json(await productsDao.getById(req.params.id))
  })

  productsRouter.post('/', async (req, res) => {  
    if (process.env.ADMINISTRATOR == 'Y'){  
      res.json(await productsDao.save(req.body))
    }else{     
      res.status(403).send('{ "error" : "-1", "descripcion" : "ruta productos, método post no autorizada" }')
    }
  })

  productsRouter.put('/:id', async (req, res) => {
    if (process.env.ADMINISTRATOR == 'Y'){  
      res.json(await productsDao.update(req.params.id, req.body))
    }else{     
      res.status(403).send('{ "error" : "-1", "descripcion" : "ruta productos, método post no autorizada" }')
    }   
  })

  productsRouter.delete('/:id', async (req, res) => {
    if (process.env.ADMINISTRATOR == 'Y'){  
      res.json(await productsDao.deleteById(req.params.id))
    }else{     
      res.status(403).send('{ "error" : "-1", "descripcion" : "ruta productos, método post no autorizada" }')
    }    
  })

};