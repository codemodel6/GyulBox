import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(res, req) {
  if (res.method == "POST") {
    // bcrypt 라이브러리를 사용해서 비밀번호를 암호화한다
    let hash = await bcrypt.hash(res.body.password, 10);

    // 요쳥의 비밀번호를 암호화된 비밀번호로 변경한다
    res.body.password = hash;

    // db 연결
    const db = (await connectDB).db("dbname");

    // db의 user_cred에 /register에서 작성한 정보를 저장한다
    await db.collection("user_cred").insertOne(res.body);

    // 저장이 잘 되었으면 응답
    req.status(200).json("가입성공");
  }
}
