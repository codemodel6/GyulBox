import { MongoClient } from "mongodb";
import { connectDB } from "@/util/database";

export default async function Home() {
  const client = await connectDB;

  // 내가 생성한 DB 이름으로 연결하고
  const db = client.db("dbname");

  // 그 DB의 Collection의 모든 내용을 배열로 가져옴
  let result = await db.collection("clname").find().toArray();
  return <div>안녕</div>;
}
