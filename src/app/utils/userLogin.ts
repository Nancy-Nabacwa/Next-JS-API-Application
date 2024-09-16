const url = '/api/login'
export const userLogin = async({
    email,
    password,
}:{
    email:string;
    password:string;
})=>{
    try{
        const response = await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email,password}),
        });
        return response.json();
        
    }catch (error){
        return error
    }
}
