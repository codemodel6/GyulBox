// // 클라이언트로 사용한다? 인듯
// "use client";
// // 클라이언트에서 정의하고 서버에서 사용한다 하니까 useRouter() 오류남 나중에 해결 바람
// import { useRouter } from "next/navigation";

// export default function DetailLink() {
//   // router.back() -> 뒤로가기
//   // router.forward() -> 앞으로가기
//   // router.refresh() -> 새로고침 -> 변동이 일어난 것만 새로고침
//   // router.prefetch() -> 로드에 필요한 파일을 미리 로드해서 빠르게 접속 가능 = Link태그와 같다
//   let router = useRouter();
//   return (
//     <button
//       onClick={() => {
//         router.prefetch("/");
//       }}
//     >
//       버튼
//     </button>
//   );
// }
