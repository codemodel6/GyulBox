// 삭제 할 때 id값 전달하는 2가지 방법
// 1. fetch의 2번째 인자로 body에 값을 넣어준다
// 2. 쿼리 스트링으로 url뒤에 ?를 붙여 전달한다 -> 민감한 정보 넣으면 안됌
// ex) fetch('/api/test?name=kim&age=20') -> {name : 'kim' , age : '20'}

"use client";
import Link from "next/link";

export default async function ListItem({ result }) {
  return (
    <div>
      {result.map((it, idx) => (
        <div key={idx} className="list-item">
          {/* prefetch 기능을 끈다 */}
          <Link prefetch={false} href={`/detail/${it._id}`}>
            <h4>{it.title}</h4>
          </Link>
          <Link href={`/edit/${it._id}`}>✏️</Link>
          <span
            onClick={(e) => {
              fetch("/api/post/delete", {
                method: "POST",
                body: it._id,
              })
                .then((r) => r.json())
                .then(() => {
                  e.target.parentElement.style.opacity = 0;
                  setTimeout(() => {
                    e.target.parentElement.style.display = "none";
                  }, 1000);
                });
            }}
          >
            🗑️
          </span>
          <p>1월 1일</p>
        </div>
      ))}
    </div>
  );
}
