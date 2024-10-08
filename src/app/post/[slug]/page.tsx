"use client"
import { useParams } from 'next/navigation';
import useSinglePost from '@/app/hooks/useSinglePost';
import PostCard from '@/app/components/postCard';

const Post = () => {
    const { slug } = useParams();
    const postId = parseInt(slug as string);
   
    const { post, loading, error } = useSinglePost(postId);

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-screen p-5">
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center w-full h-screen p-5">
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }


    return (
        <div>
            {post?.id ? (
                <PostCard
                    key={post.id}
                    singlePost={post}
                />
            ) : (<div className="flex items-center justify-center w-full h-screen p-5">
                <p className="text-red-500">No Post Found</p>
            </div>)}
        </div>
    );
};

export default Post;