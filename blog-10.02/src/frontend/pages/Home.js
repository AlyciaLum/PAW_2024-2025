import { useEffect, useState } from "react";

const HomePage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/posts")
            .then(res => res.json())
            .then(data => setPosts(data));
    }, []);

    return (
        <div>
            <h2>Lista postów</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <a href={`/post/${post.id}`}>{post.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
