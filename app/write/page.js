export default function Write() {
  return (
    <div className="p-20">
      <h4>글 작성</h4>
      {/* action = 요청 보낼 주소 method = GET 혹은 POST */}
      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="글제목"></input>
        <input name="content" placeholder="글내용"></input>
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
