import { MongoClient } from "mongodb";

export const MongoHelper = {
  client: null as MongoClient,
  async connect(uri: string): Promise<void> {
    this.clinet = await MongoClient.connect(uri);
  },

  async disconnect(): Promise<void> {
    this.client.close();
  },
};
