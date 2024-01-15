import { connectDB } from '@/util/database'

export default async function handler(request, response){
    const client = await connectDB;
    const db = client.db("forum")
    let result = await db.collection('post').find().toArray()

    if(request.method == "GET"){
        return response.status(200).json(result)
    } 
}