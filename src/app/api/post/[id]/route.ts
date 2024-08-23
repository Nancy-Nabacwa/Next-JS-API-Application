const baseUrl = process.env.BASE_URL;

export async function GET(_request: Request, {params: {id}}: {params: {id:string}} ){ 

    console.log({id});
    

    try{
        const response = await fetch (`${baseUrl}/posts/${id}`);
        const result = await response.json();
        return new Response(JSON.stringify(result),{
            status:200,
        })

    }catch(error){
        return new Response((error as Error).message)
    }
    
}