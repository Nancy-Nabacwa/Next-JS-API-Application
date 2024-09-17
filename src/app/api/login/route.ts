// export async function POST(request:Request){
//     const baseUrl = process.env.BASE_URL
//     const {username, password} = await request.json();
//     if(!username && !password){
//         return new Response('Username and password missing' , {
//             status:400,
//         }) 
//     }

//     try{
//         const response = await fetch (`${baseUrl}/auth/login`,{
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



// pages/api/login.js

export async function POST(request:Request) {
    const baseUrl = process.env.BASE_URL;
    const { email, password } = await request.json();
  
    // Check if both username and password are present
    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password are required.' }), {
        status: 400,
      });
    }
  
    try {
      const response = await fetch(`${baseUrl}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        return new Response(JSON.stringify({ error: errorData.detail || 'Invalid credentials' }), {
          status: response.status,
        });
      }
  
      const result = await response.json();
  
      return new Response(JSON.stringify(result), {
        status: 200,
        statusText: 'Login successful',
      });
    }catch(error){
                return new Response((error as Error).message,{
                    status:500
                })
            }
  }
  