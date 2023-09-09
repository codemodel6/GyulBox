import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Edit(props) {
  // db연결
  const db = (await connectDB).db("dbname");

  // Listitem페이지에서 받은 id를 이용해 DB에 같은 id가 있는 곳을 찾는다
  let result = await db
    .collection("clname")
    .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div className="p-20">
      <h4>수정 페이지</h4>
      {/* action = 요청 보낼 주소, method = GET 혹은 POST */}
      <form action="/api/post/edit" method="POST">
        {/* Next.js에서는 value를 defaultValue라 써야 한다 */}
        <input name="title" defaultValue={result.title ?? ""} />
        <input name="content" defaultValue={result.content} />

        {/* 수정할 id를 보내주어야 한다. user가 건드리지 못하게 display: none으로 보여주지 않는다. */}
        <input
          style={{ display: "none" }}
          name="_id"
          defaultValue={result._id.toString()}
        />
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
