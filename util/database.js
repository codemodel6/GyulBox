// MongDB 연결
import { MongoClient } from "mongodb";
const url = "mongodb+srv://rudqq:rudqo681@mogo.qbmj03s.mongodb.net/dbname";
const options = { useNewUrlParser: true };
let connectDB;

if (process.env.NODE_ENV === "development") {
  if (!global._mongo_) {
    global._mongo_ = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo_;
} else {
  connectDB = new MongoClient(url, options).connect();
}
export { connectDB };

// 쉬운버전
// const client = await MongoClient.connect(
//     "mongodb+srv://rudqq:rudqo681@mogo.qbmj03s.mongodb.net/",
//     { useNewUrlParser: true }
//   );

//   export { client };
