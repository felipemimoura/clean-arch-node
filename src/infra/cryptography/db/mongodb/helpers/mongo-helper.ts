import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import { AccountModel } from "../../../../../domain/usecases/models/account";

export const MongoHelper = {
  client: null as MongoClient,
  db: null as Db,
  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri);
  },

  async disconnect(): Promise<void> {
    this.client.close();
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },

  map(data: any): any {
    const { _id, ...dataWithoutId } = data;
    return Object.assign({}, dataWithoutId, { id: _id });
  },
};
