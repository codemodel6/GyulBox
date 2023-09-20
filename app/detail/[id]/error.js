"use client";

// 에러가 날 시 에러가 난 컴포넌트만 이 컴포넌트를 보여준다
export default function Error({ error, reset }) {
  return (
    <div>
      <h4>Error</h4>
      {/* error - 에러메세지를 보여줌 reset - 페이지를 다시 로드해줌 */}
      <button onClick={reset()}>새로고침</button>
    </div>
  );
}
