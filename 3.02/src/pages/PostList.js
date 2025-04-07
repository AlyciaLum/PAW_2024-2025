import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPosts = async () => {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return data;
};

export default function PostList() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts
    });

    if (isLoading) return <p>Ładowanie...</p>;
    if (error) return <p>Błąd: {error.message}</p>;

    return (
        <ul>
            {data.map(post => (
                <li key={post.id}>
                    <a href={`/post/${post.id}`}>{post.title}</a>
                </li>
            ))}
        </ul>
    );
}
