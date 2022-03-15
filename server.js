import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import routes from './routes/index.js'

const PORT = 8080 || process.env.PORT;

console.log(process.env.BASEDATOS)

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.use(cors(`${PORT}`));

routes(app)

app.listen(PORT, () => {
  console.log(`server corriendo en http://localhost:${PORT}`);
});