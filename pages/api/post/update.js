import { connectDB } from "@/util/database"
import { ObjectId } from 'mongodb'

export default async function handler(request, response) {
  if (request.method == 'POST'){
    if (request.body.title == '') {
      return response.status(500).json('Title field is required.')
    }
    if (request.body.content == '') {
        return response.status(500).json('Content field is required.')
      }
    let session = await getServerSession(request, response, authOptions)
    if(request.body.author == session.user.email || session.user.role == admin){
        try {
            let db = (await connectDB).db('forum')
            console.log(request.body)
      
            let result = await db.collection('post').updateOne(
              {_id: new ObjectId(request.body._id)},
              {$set: {title: request.body.title, content: request.body.content}});
            
            response.redirect(302, '/list')
          } catch (error) {
          }
    }
    else{
        return response.status(500).json('User Credential Mismatch')
    }

    
  }
} 