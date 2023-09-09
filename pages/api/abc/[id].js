import { connectDB } from "@/util/database";

// /api/abc/[어떤 값] 으로 요청을 하면 이 파일 실행
export default async function handler(req, res) {
  console.log(req.query);
  return res.status(200).json("어떤 값이 나오게 된다.");
}
