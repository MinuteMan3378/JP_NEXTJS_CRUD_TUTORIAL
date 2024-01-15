'use client'
import Link from 'next/link'


export default function ListItem({ result }) {
    return (
        <div className="list-bg">
            {
                result.map((t, i) =>

                    <div className="list-item" key={i}>
                        <Link prefetch={false} href={'/detail/' + result[i]._id}>
                            <h4>{result[i].title}</h4>
                        </Link>
                        <p>{result[i].content}</p>
                        <Link href={'/edit/' + result[i]._id}> 수정 </Link>
                        <span onClick={(e) => {
                            fetch('/api/post/delete?_id=' + result[i]._id)
                                .then((r) => {
                                    if (r.status == 200) {
                                        e.target.parentElement.style.opacity = 0
                                        setTimeout(() => {
                                            e.target.parentElement.style.display = 'none'
                                        }, 1000)
                                    }

                                })
                        }}>삭제</span>
                    </div>

                )

            }
            <Link prefetch={false} href={'/write'}>
                <button type="submit">글 작성</button>
            </Link>
        </div>
    )
}