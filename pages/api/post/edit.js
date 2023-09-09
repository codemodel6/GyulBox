import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

// edit페이지에서 POST 요청 보낼 시 수행하는 함수
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log("수정할 내용 : ", req.body);

      // 수정할 내용을 객체로 변수 선언
      let updateContent = { title: req.body.title, content: req.body.content };

      // DB연결
      const db = (await connectDB).db("dbname");

      // updateOne은 DB에 있는 내용을 수정해준다 첫번째 인자는 어떤 id를 수정할지 두번째 인자는 수정할 내용
      // updateOne의 $set은 문자를 덮어씌움 $inc는 숫자를 더해줌
      let result = await db
        .collection("clname")
        .updateOne(
          { _id: new ObjectId(req.body._id) },
          { $set: updateContent }
        );
      res.writeHead(302, { Location: "/list" });
      res.end();
    } catch (error) {
      console.error(error);
    }
  }
}
