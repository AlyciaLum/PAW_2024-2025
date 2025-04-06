import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(res => res.json())
            .then(data => {
                setPost(data);
                return fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`);
            })
            .then(res => res.json())
            .then(userData => setUser(userData));
    }, [id]);

    if (!post || !user) return <div>Ładowanie...</div>;

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <hr />
            <h4>Autor: {user.name}</h4>
            <p>Email: {user.email}</p>
        </div>
    );
}
