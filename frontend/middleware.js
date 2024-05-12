import { cookies } from "next/headers.js"

export async function middleware(request) {
//     // console.log(request.cookies.get("BlogJwt")?.value)
//     const cookie=request.cookies.get("BlogJwt")?.value

    
//     // const cookieStore = cookies()
//     // const token = cookieStore.get('BlogJwt').value
    
    
//     const response=await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user-info`,{
//         method:"GET",
//         headers:{
//             'Content-Type': 'application/json',
//             'Cookie': `BlogJwt=${cookie}`
//         } 
//     })
//     //not authorized
//     if (!response.ok) {
//         throw new Error('unAuthorized');
//     }

//     //authorized
//     const user =await response.json()
// console.log(user)
    

}