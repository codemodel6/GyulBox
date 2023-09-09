import { connectDB } from "@/util/database";

// 어떤 사람이 /api/test로 GET/POST..등 요청을 하면 파일 안의 코드 실행
export default async function handler(req, res) {
  const client = await connectDB;
  const db = client.db("dbname");
  let result = await db.collection("clname").find().toArray();
  return res.status(200).json(result);
}
