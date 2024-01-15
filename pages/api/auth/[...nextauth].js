import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

export const authOptions = {
  providers: [
    GithubProvider({
            clientId: '8369c1132cf346129e6e',
            clientSecret: process.env.GITHUB_SECRET,
        }),

        CredentialsProvider({ 
          name: "credentials",
            credentials: {
              email: { label: "email", type: "text" },
              password: { label: "password", type: "password" },
          },
    
          async authorize(credentials) {
            let db = (await connectDB).db('forum');
            let user = await db.collection('user_cred').findOne({email : credentials.email})
            console.log(user)
            
            if (!user) {
              console.log('No Such Email');
              return null
            }
            const pwcheck = await bcrypt.compare(credentials.password, user.password);
            console.log(pwcheck)
            if (!pwcheck) {
              console.log('Wrong Password');
              return null
            }
            return user
          }
        })
      ],
    
      session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60
      },
    
    
      callbacks: {
        jwt: async ({ token, user }) => {
          if (user) {
            token.user = {};
            token.user.name = user.name
            token.user.email = user.email
            token.user.role = user.role
          }
          return token;
        },

        session: async ({ session, token }) => {
          session.user = token.user;  
          return session;
        },
      },

      secret: process.env.JWT_SECRET,
      adapter: MongoDBAdapter(connectDB),
      
    };
    export default NextAuth(authOptions);