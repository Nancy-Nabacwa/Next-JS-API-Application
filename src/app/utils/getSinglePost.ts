const url = '/api/post/';

export const getSinglePost = async (postId: number) => {
    try {
        const response = await fetch(`${url}/${postId}`); 
        
        if (!response.ok) {
            throw new Error(`Error fetching post: ${response.statusText}`);
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("Error fetching post:", error);
        throw error; 
    }
};

