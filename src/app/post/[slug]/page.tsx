"use client"
import { useParams } from 'next/navigation';
import useSinglePost from '@/app/hooks/useSinglePost';
import PostCard from '@/app/components/postCard'; 

const Post = () => {
    const { slug } = useParams(); 
    const postId = parseInt(slug as string); 
    if (isNaN(postId)) {
        return (
            <div className="flex items-center justify-center w-full h-screen p-5">
                <p className="text-red-500">Invalid Post ID</p>
            </div>
        );
    }

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
            {post && (
                <PostCard 
                    key={post.id} 
                    postOne={post} 
                />
            )}
        </div>
    );
};

export default Post;