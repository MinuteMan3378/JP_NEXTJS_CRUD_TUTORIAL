import { connectDB } from '@/util/database'
import { ObjectId } from 'mongodb'

export default async function Edit(props) {
    const client = await connectDB;
    const db = client.db("forum")
    let result = await db.collection('post').findOne({_id: new ObjectId(props.params.id)})

    return (
      <div className="p-20">
        <form action="/api/post/update" method="POST">
            <input name="_id" defaultValue={result._id} type="hidden"></input>
            <input name="title" defaultValue={result.title}></input>
            <input name="content" defaultValue={result.content}></input> 
            <button type="submit">수정</button>
        </form>
      </div>
    )
  } 