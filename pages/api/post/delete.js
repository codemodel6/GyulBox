import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  let session = await getServerSession(req, res, authOptions);
  console.log("session : ", session);
  try {
    // 메소드 DELETE로 하면 BODY가 안보내짐
    if (req.method === "POST") {
      console.log("삭제할 내용 : ", req.body);

      // DB연결
      const db = (await connectDB).db("dbname");

      // DB의 clname(게시판 리스트)에서 현재 요청의 id값을 찾는다
      let findUser = await db
        .collection("clname")
        .findOne({ _id: new ObjectId(req.body) });
      console.log("findUser : ", findUser);

      // 현재 로그인한 email과 게시판 list의 email이 같은지 비교한다
      if (session.user.email === findUser.author) {
        // deleteOne은 해당 id값을 삭제한다
        let result = await db
          .collection("clname")
          .deleteOne({ _id: new ObjectId(req.body) });
        res.status(200).json("삭제성공");
      } else console.log("다른 계정입니다");
    }
  } catch (error) {
    console.error(error);
  }
}
