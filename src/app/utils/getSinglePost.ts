
const url = '/api/post/'; // Assuming your API endpoint is at this URL

export const getSinglePost = async (postId: number) => {
    try {
        const response = await fetch(`${url}/${postId}`); // Pass postId in the URL
        
        if (!response.ok) {
            throw new Error(`Error fetching post: ${response.statusText}`);
        }

        const data = await response.json();
        return data; // Return the single post data
    } catch (error) {
        console.error("Error fetching post:", error);
        throw error; 
    }
};

// src/app/utils/getSinglePost.ts
// const baseUrl = process.env.BASE_URL; // Ensure this is set correctly

// export const getSinglePost = async (postId: number) => {
//     try {
//         const response = await fetch(`${baseUrl}/api/post/${postId}`); // Use the actual post ID in the URL
        
//         if (!response.ok) {
//             throw new Error(`Error fetching post: ${response.statusText}`);
//         }

//         const data = await response.json();
//         return data; // Return the single post data
//     } catch (error) {
//         console.error("Error fetching post:", error);
//         throw error; 
//     }
// };