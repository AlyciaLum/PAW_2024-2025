import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPost = async (id) => {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return data;
};

const fetchUser = async (userId) => {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return data;
};

export default function PostPage() {
    const { id } = useParams();

    const { data: post, isLoading: loadingPost } = useQuery({
        queryKey: ['post', id],
        queryFn: () => fetchPost(id)
    });

    const { data: user, isLoading: loadingUser } = useQuery({
        enabled: !!post?.userId,
        queryKey: ['user', post?.userId],
        queryFn: () => fetchUser(post.userId)
    });

    if (loadingPost || loadingUser) return <p>Ładowanie...</p>;

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            {user && (
                <div>
                    <h4>Autor: {user.name}</h4>
                    <p>Email: {user.email}</p>
                </div>
            )}
        </div>
    );
}
