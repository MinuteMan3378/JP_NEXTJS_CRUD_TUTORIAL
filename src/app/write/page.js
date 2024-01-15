import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"

export default async function Write() {
    let session = await getServerSession(authOptions)
    if(!session){
        return (
            <div>Login Please</div>
        )
    }
    
    return (
      <div className="p-20">
        <form action="/api/post/new" method="POST">
          <input name="title" placeholder="글제목"/>
          <input name="content" placeholder="글내용"/>
          <button type="submit">전송</button>
        </form>
      </div>
    )
  } 