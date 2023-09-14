import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if ((req.method = "POST")) {
    console.log(req.body);

    // 로그인한 사용자 정보를 가져온다
    let session = await getServerSession(req, res, authOptions);
    console.log(session);

    // 댓글 DB에 저장할 객체를 만들어준다
    // boardID는 몽고DB의 ObjectId에 넣어준다
    let saveItem = {
      boardID: new ObjectId(req.body.id),
      comment: req.body.comment,
      author: session.user.email,
    };
    const db = (await connectDB).db("dbname");
    let result = await db.collection("comment").insertOne(saveItem);
    res.status(200).json("저장완료");
  }
}
