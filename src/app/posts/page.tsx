"use client"
import usePosts from '@/app/hooks/usePosts';
import PostCard from '../components/postsCard';


const Posts = () => {
    const { posts, loading, error} = usePosts();

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
            {posts.length > 0 ? (
                posts.map(post => (
                    <PostCard 
                        key={post.id} 
                        post={post} 
                    />
                ))
            ) : (
                <p>No posts available</p>
            )}
        </div>
    );
};

export default Posts;