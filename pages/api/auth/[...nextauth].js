import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    // ----------------------------- 깃허브 auth 사용하는 provider ----------------
    GithubProvider({
      clientId: "6b2d3797324049b0b072",
      clientSecret: "740a890bc6131ce34484326c5211b61f60b77738",
    }),
    // ----------------------------------------------------------------------------

    // ------------------------------ 세션 방식 로그인 -----------------------------
    CredentialsProvider({
      // 1. 로그인페이지 폼 자동생성해주는 코드
      // credentials의 input 개수를 늘릴 수 있다.
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      // 2. 로그인요청시 실행되는코드
      // 직접 DB에서 아이디,비번 비교하고
      // 아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        let db = (await connectDB).db("dbname");
        let user = await db
          .collection("user_cred")
          .findOne({ email: credentials.email });
        if (!user) {
          console.log("해당 이메일은 없음");
          return null;
        }
        const pwcheck = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!pwcheck) {
          console.log("비번틀림");
          return null;
        }
        return user;
      },
    }),
  ],

  // 3. 세션 방식을 쓸지 jwt 방식을 쓸지 결정
  // jwt 써놔야 잘됨 maxAge = jwt 만료일설정(로그인 기간)
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1일
  },

  callbacks: {
    // 4.jwt 만들 때 실행되는 코드
    // user변수는 DB의 유저정보담겨있고 token.user.원하는거 입력하면 jwt에 들어간다.
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
      }
      return token;
    },
    // 5.유저 세션이 조회될 때 마다 실행되는 코드
    // 토큰에 있는 모든 데이터를 컴포넌트로 보냄
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  // ----------------------------------------------------------------------------

  // jwt생성시 사용하는 암호
  secret: "1234",
  adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions);
