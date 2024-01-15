import { connectDB } from '@/util/database'
import { ObjectId } from 'mongodb'

export default async function handler(request, response){
    const client = await connectDB;
    const db = client.db("forum")
    let result = await db.collection('comment')
    .find({parent: request.query.parent_id}).toArray()

    response.status(200).json(result)

}