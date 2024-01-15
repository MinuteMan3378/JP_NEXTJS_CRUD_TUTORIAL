'use client'

import { useEffect, useState } from "react"

export default function Comment({ parent_id }) {
    let [comment, setComment] = useState('')
    let [data, setData] = useState([])

    useEffect(()=>{
        fetch('/api/comment/list?parent_id='+parent_id)
        .then(r=>r.json())
        .then((result)=>{
            setData(result)
        })

    }, [])
    return (
        <div>
            
            <div>댓글</div>
            {
                data.map((c, i)=>{
                    return(
                        <p key={i}>{c.author}: {c.content}</p>
                    )
                })
            }
            <input onChange={(e) => { setComment(e.target.value) }} />
            <button onClick={() => {
                fetch('/api/comment/new', { method: 'POST', body: JSON.stringify({comment, parent_id}) })
            }}>댓글 입력</button>
        </div>
    )
}