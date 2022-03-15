import admin from 'firebase-admin';
import config from '../../config/index.js';
import moment from 'moment';

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
});

const db = admin.firestore();

export default class FirebaseContainer {
  constructor(collectionName) {
    this.coleccion = db.collection(collectionName);
  }

  async getById(id) {
    try {
      const doc = await this.coleccion.doc(id).get();
      if (!doc.exists) {
        const data = [];
        return data;
      } else {
        const data = doc.data();
        return { ...data, id };
      }
    } catch (error) {
      throw new Error(`Error getById(id): ${error}`);
    }
  }

  async getAll() {
    try {
      const result = [];
      const snapshot = await this.coleccion.get();
      snapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
      return result;
    } catch (error) {
      throw new Error(`Error getAll: ${error}`);
    }
  }

  async save(newElement) {
    newElement.timestamp = moment(new Date()).format('DD/MM/YYYY HH:mm');
    try {
      const doc = await this.coleccion.add(newElement);
      return { ...newElement, id: doc.id };
    } catch (error) {
      throw new Error(`Error save: ${error}`);
    }
  }

  async update(id, newData) {
    newData.timestamp = moment(new Date()).format('DD/MM/YYYY HH:mm');
    try {
      const doc = await this.coleccion.doc(id).set(newData);
      return{ "status" : "success"}
    } catch (error) {
      throw new Error(`Error update: ${error}`);
    }
  }

  async deleteById(id) {
    try {
      const doc = await this.coleccion.doc(id).delete();
      return{ "status" : "success"}
    } catch (error) {
      throw new Error(`Error delete: ${error}`);
    }
  }
 

}