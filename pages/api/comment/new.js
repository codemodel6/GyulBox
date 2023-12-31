import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const db = (await connectDB).db("dbname");

  if (req.method === "POST") {
    // 클라이언트에서 JSON.stringify로 보냈으므로 서버에서는 JSON.parse로 받아야 한다
    req.body = JSON.parse(req.body);
    console.log("req.body -> ", req.body);

    // 로그인한 사용자 정보를 가져온다
    let session = await getServerSession(req, res, authOptions);
    console.log("session -> ", session);

    // 댓글 DB에 저장할 객체를 만들어준다
    // boardID는 몽고DB의 ObjectId에 넣어준다
    let saveItem = {
      boardID: new ObjectId(req.body.id),
      comment: req.body.comment,
      author: session.user.email,
    };

    // DB에 saveItem의 값ㅇ르 저장
    let saveResult = await db.collection("comment").insertOne(saveItem);

    // 저장이 된 DB의 결과값을 응답한다
    let result = await db
      .collection("comment")
      .find({ boardID: new ObjectId(req.body.id) })
      .toArray();
    res.status(200).json(result);
  }
}
