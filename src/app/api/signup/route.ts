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


// pages/api/signup.js

export async function POST(request:Request) {
    const baseUrl = process.env.BASE_URL;
    const { firstname, lastname, email, password } = await request.json();
  
    // Check if all required fields are present
    if (!firstname || !lastname || !email || !password) {
      return new Response(JSON.stringify({ error: 'All fields are required.' }), {
        status: 400,
      });
    }
  
    try {
      const response = await fetch(`${baseUrl}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        return new Response(JSON.stringify({ error: errorData.detail || 'Failed to create user' }), {
          status: response.status,
        });
      }
  
      const result = await response.json();
  
      return new Response(JSON.stringify(result), {
        status: 201,
        statusText: 'User created successfully',
      });
    }catch(error){
                return new Response((error as Error).message,{
                    status:500
                })
            }
  }
  