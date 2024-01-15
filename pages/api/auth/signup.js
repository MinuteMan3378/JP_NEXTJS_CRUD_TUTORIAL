import { connectDB } from "@/util/database"
import bcrypt from 'bcrypt'

export default async function handler(request, response){
    if(request.method == "POST"){
        console.log(request.body)
        if (!request.body.name) {
            return response.status(500).json('Name field is required.')
        }
        if (!request.body.email) {
            return response.status(500).json('Email field is required.')
        }
        if (!request.body.password) {
            return response.status(500).json('Password field is required.')
        }

        let db = (await connectDB).db('forum')
        let test = await db.collection('user_cred').findOne({email: request.body.email})
        if (test){
            return response.status(500).json('This email is already exists.')
        }

        let hash = await bcrypt.hash(request.body.password, 3)
        request.body.password = hash
        request.body.role = 'normal'
          
        await db.collection('user_cred').insertOne(request.body)
        response.status(200).json("가 입 성 공")
    }
}