import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(request, response) {
    let session = await getServerSession(request, response, authOptions)
    if (session){
        let req = JSON.parse(request.body)
        if (request.method == 'POST') {
            if (!req.comment) {
                return response.status(500).json('Content field is required.')
            }
            try {
                let db = (await connectDB).db('forum')
                let result = db.collection('comment').insertOne({
                    content: req.comment, 
                    author: session.user.email, 
                    parent: req.parent_id
                })
                return response.status(200).json('comment success')
            } catch (error) {
            }
    
        }
    }
    else{
        return response.status(500).json('Login Please')
    }
    
} 