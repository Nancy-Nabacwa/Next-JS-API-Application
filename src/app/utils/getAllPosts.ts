
const url = '/api/posts'; 

export const getAllPosts = async () => {
    try {
        const response = await fetch(url); 
        
        if (!response.ok) {
            throw new Error(`Error fetching posts: ${response.statusText}`);
        }

        const data = await response.json();

        if (Array.isArray(data.posts)) {
            return data.posts; 
        } else {
            throw new Error('Unexpected response Failed to Load Posts');
        }
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error; 
    }
};
