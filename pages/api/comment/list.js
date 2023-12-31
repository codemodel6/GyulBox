import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

// 댓글 목록을 가져온다
export default async function handler(req, res) {
  const db = (await connectDB).db("dbname");

  // 게시판의 아이디 확인 - req.query = boardID이다
  console.log("req.query -> ", req.query);

  // find 내부에 객체를 적어주면 그 key value를 가져온다
  let result = await db
    .collection("comment")
    .find({ boardID: new ObjectId(req.query.id) })
    .toArray();

  console.log("값", result);
  res.status(200).json(result);
}
