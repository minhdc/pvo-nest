import * as mongoose from "mongoose"
const MongoClient  = require('mongodb').MongoClient
export const DatabaseProvider = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => {
            (mongoose as any).Promise = global.Promise;
            return await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology: true})
            // const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true,useUnifiedTopology:true });
            // return client
        }
            // client.connect()
        
    }
]