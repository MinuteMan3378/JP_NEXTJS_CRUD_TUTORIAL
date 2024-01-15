import { connectDB } from "@/util/database"
import { ObjectId } from 'mongodb'
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(request, response) {
    let session = await getServerSession(request, response, authOptions)
    if (session){
        let db = (await connectDB).db('forum')  
        let test = await db.collection('post').findOne({_id: new ObjectId(request.query._id)})
        console.log(session.user.role)
        if(test.author == session.user.email || session.user.role == 'admin'){
            try {                    
                let result = await db.collection('post').deleteOne(
                  {_id: new ObjectId(request.query._id)})
                
                return response.status(200).json("삭 제 완 료")
              } catch (error) {
              }
        }
        else{
            return response.status(500).json("유저 정보 불일치")
        }
    }
    else{
        return response.status(500).json("로그인 정보 없음")
    }
} 