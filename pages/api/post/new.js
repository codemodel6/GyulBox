import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  // db연결
  const db = (await connectDB).db("dbname");

  let session = await getServerSession(req, res, authOptions);
  if (session) {
    console.log("session : ", session);

    // body 객체에 새로운 key value 추가
    req.body.author = session.user.email;
    console.log("req.body : ", req.body);
  }

  // write페이지에서 POST요청이 오면 실행
  if (req.method === "POST") {
    // 요청에서 제목란이 비어있다면 에외처리
    if (req.body.title === "") return res.status(500).json("제목을 입력하세요");

    try {
      // DB clname에 req.body 추가
      let result = await db.collection("clname").insertOne(req.body);

      // 성공 시 list 페이지로 이동
      res.writeHead(302, { Location: "/list" });
      res.end();
    } catch (error) {
      return console.error(error);
    }
  }
}
