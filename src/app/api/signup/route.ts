// export async function POST(request:Request){
//     const baseUrl = process.env.BASE_URL
//     const {username, password} = await request.json();
//     if(!username && !password){
//         return new Response('credentials missing' , {
//             status:400,
//         }) 
//     }

//     try{
//         const response = await fetch (`${baseUrl}/api/signup`,{
//             method:'POST',
//             headers:{
//                 'Content-type':'application/json',
//             },
//             body:JSON.stringify({username,password})
//         })
//        const result = await response.json();

//        return new Response (JSON.stringify (result),{
//         status:201,
//         statusText:"Login successful"

//        })


//     }catch(error){
//         return new Response((error as Error).message,{
//             status:500
//         })
//     }
// }


// src/app/api/signup/route.ts

export async function POST(request: Request) {
    const baseUrl = process.env.BASE_URL;
    const { username, password } = await request.json();

    if (!username || !password) {
        return new Response('Credentials missing', {
            status: 400,
        });
    }

    try {
        const response = await fetch(`${baseUrl}/api/signup/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            // If the response is not okay, log the text response and return it
            const errorText = await response.text();
            return new Response(errorText, {
                status: response.status,
                statusText: response.statusText,
            });
        }

        const result = await response.json();
        return new Response(JSON.stringify(result), {
            status: 201,
            statusText: "Signup successful"
        });
    } catch (error) {
        console.error('Error during signup:', error); // Log error for debugging
        return new Response((error as Error).message, {
            status: 500
        });
    }
}
