# DB 연결 방법

util 폴더 안에 database.js안에 Next.js와 MongoDB를 연결하는 코드가 있다.

이후 연결하고 싶은 페이지에서

const client = await connectDB;

// 내가 생성한 DB 이름으로 연결하고
const db = client.db("dbname");

// 그 DB의 Collection의 모든 내용을 배열로 가져옴
let result = await db.collection("clname").find().toArray();

이 3개의 코드를 실행한다.

첫번째코드와 두번째 코드를 합쳐서 가독성이 좋게 할 수 있다.
const db = (await connectDB).db("dbname")

# DB 연결 종류

find().toArray - DB내용 전부 가져와서 배열로 출력
findOne("id") - id의 내용을 하나 가져온다
deleteOne("id") - id의 내용을 지운다

# 렌더링 방법

1. npm run build -> 내 모든 코드를 검색 엔진 친화적인 자바스크립트 문법으로 만들어줌
2. npm run start -> 클라우드에서 실행

next.js에서의 두거지 렌더링 방법
ㅇ = static rendering -> npm run build 할때 만든 html 페이지 그대로 보내줌 (정보가 많이 없다)
ㅅ = dynamic rendering -> 유저가 페이지 접속할 때 마다 html 페이지 새로 만들어서 보내줌

fetch를 쓰면 ㅅ 으로 자동으로 된다. 하지만 ㅅ 이어야 하는데 ㅇ 인 페이지가 있다. 이걸 바꾸는 방법은

export const dynamic = 'force-dynamic' -> 항상 ㅅ
export const dynamic = 'force-static' -> 항상 ㅇ

ㅅ 은 서버나 db에 부담될 수 있다. -> 캐싱 방법을 통해 해결할 수 있다.
캐싱 = 요청 결과를 저장해두고 재사용

await fetch('URL', {cache : 'force-cache'}) -> 근데 {cache : 'force-cache'} 는 안써도 자동으로 있음
{next : {revalidate : 60}} -> 60초 마다 캐싱된 데이터 갱신

fetch를 안하고 데이터베이스에서 데이터를 직접 가져올 경우의 캐싱
export const revalidate = 60; -> 60초마다 캐싱 갱신

# 로그인

Next-auth 사용

## github 연동

1. 내 프로필 -> setting -> developer setting -> oauth app -> 만든 후 Generate a new client secret
2. pages/api/auth 폴더 만든 후 [...nextauth].js 를 만든 후 지정된 코드를 넣는다
3. 로그인 버튼을 만든다. next-auth/react 에서 import 후 onClick 시 signIn() 이라는 함수를 실행시키기만 하면 된다. signOut 은 로그아웃 버튼이다.
4. 서버 컴포넌트에서 현재 로그인한 유저의 정보를 보려면 await getServerSession(authOptions) 함수를 사용한다 - authoOptions은 [...nextautho].js 파일 안에 있는 변수

## session 방법

1. npm install @next-auth/mongodb-adapter 어뎁더 다운로드
2. [...nextautho].js 코드에 adapter : MongoDBAdapter(connectDB) 를 적는다
3. 실행하면 하나의 DB가 생긴다 (test)
   accoutns - 가입한 유저의 계정을 보관 -> 하나의 유저가 여러가지 계정을 가질 수 있다.
   sessions - 현재 로그인된 유저 세션 정보가 있다. -> 이걸 이용해 악성 유저를 강제 로그아웃 시키거나 가능
   user - 가입한 이메일이 같다면 하나만 있음 그러므로 구분을 email로 함
4. 내가 쓰던 DB에 나오게 하고 싶다면, DB연결 코드 마지막에 DB 이름을 적는다.
5. 서버 코드에서 session = getServerSession(req,res,authOptions) 을 사용해서 현재 유저의 정보를 가져온다
6. body 속성에 새로운 key value로 계정의 이메일을 넣어준다.
