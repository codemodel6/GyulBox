import { connectDB } from "@/util/database";
import ListItem from "./ListItem";

// README-렌더링 방법
export const dynamic = "force-dynamic";

export default async function List() {
  // db연결
  const db = (await connectDB).db("dbname");

  // db의 clname에 있는 내용을 배열로 가져온다 clname은 작성한 게시판들이다
  let result = await db.collection("clname").find().toArray();

  // id값은 string값으로 보내야 하기 때문에 map으로 새롭게 만든다
  result = result.map((it) => {
    it._id = it._id.toString();
    return it;
  });

  console.log("게시판 리스트 : ", result);

  return (
    <div className="list-bg">
      <ListItem result={result} />
    </div>
  );
}
