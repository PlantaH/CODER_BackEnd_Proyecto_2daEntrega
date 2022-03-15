import mongoose from 'mongoose';
import moment from 'moment';
import config from '../../config/index.js';
 
await mongoose.connect(`${config.mongodb.conexion}`);

export default class MongoContainer {

  
  constructor(collectionName, schema) {
    this.coleccion = mongoose.model(collectionName, schema);
  }

  async getById(id) {
    try {
      const doc = await this.coleccion.findById(id,{ __v: 0 });
      if (doc.length == 0) {
        const data = [];
        return data;
      } else {
        return doc;
      }
    } catch (error) {
      const data = [];
      return data;
    }
  }

  async getAll() {
    try {
      let docs = await this.coleccion.find({}, { __v: 0 });
      return docs;
    } catch (error) {
      throw new Error(`Error getAll: ${error}`);
    }
  }

  async save(newElement) {
    
    newElement.timestamp = moment(new Date()).format('DD/MM/YYYY HH:mm')
    try {
        const doc = await this.coleccion.create(newElement);
        return doc
    } catch (error) {
        throw new Error(`Error save: ${error}`)
    }
}


  async update(id, newData) {
    newData.timestamp = moment(new Date()).format('DD/MM/YYYY HH:mm')
    try {     
      await this.coleccion.replaceOne( { _id: id }, newData)
      const result = await this.coleccion.find({ _id: id }, { __v: 0 });
      return result 
    } catch (error) {
      throw new Error(`Error update: ${error}`)
    }

  }

  async deleteById(id) {
    try {
      const deletedDoc = await this.coleccion.deleteOne({'_id': id })
      return deletedDoc
    } catch (error) {
      throw new Error(`Error delete: ${error}`)
    }
  }

  async deleteAll() {
    try {
      await this.coleccion.deleteMany({})
    } catch (error) {
      throw new Error(`Error deleteAll: ${error}`)
    }
  }
}