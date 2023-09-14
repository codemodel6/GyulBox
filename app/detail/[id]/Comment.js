"use client";

import { useEffect, useState } from "react";

export default function Comment(props) {
  let [comment, setComment] = useState();

  useEffect(() => {
    fetch(`/api/comment/list?id=${props.id}`)
      .then((e) => e.json)
      .then((e) => {
        console.log("e -> ", e);
      });
  });

  return (
    <div>
      <div>댓글목록</div>
      <input
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      {/* object나 array를 전달하고 싶다면 JSON.stringify 안에 넣어서 전달한다 */}
      <button
        onClick={() => {
          fetch("/api/comment/new", {
            method: "POST",
            body: JSON.stringify({ comment: comment, id: props.id }),
          });
        }}
      >
        댓글전송
      </button>
    </div>
  );
}
