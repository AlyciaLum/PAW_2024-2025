import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        fetch(`http://localhost:5000/posts/${id}`)
            .then(res => res.json())
            .then(data => {
                setPost(data.post);
                setComments(data.comments);
            });
    }, [id]);

    const handleAddComment = () => {
        fetch("http://localhost:5000/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                postId: id,
                author: "Anonim", // można dodać input do autora
                content: newComment
            })
        })
            .then(res => res.json())
            .then(comment => {
                setComments(prev => [...prev, comment]);
                setNewComment("");
            });
    };

    if (!post) return <p>Ładowanie...</p>;

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>

            <h3>Komentarze:</h3>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>{comment.author}: {comment.content}</li>
                ))}
            </ul>

            <h4>Dodaj komentarz:</h4>
            <textarea
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
            />
            <br />
            <button onClick={handleAddComment}>Wyślij</button>
        </div>
    );
};

export default PostPage;
