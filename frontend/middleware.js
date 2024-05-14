import { cookies } from "next/headers.js"
import { NextResponse } from "next/server.js"

export async function middleware(request) {

    const cookie=request.cookies.get("BlogJwt")?.value

    

    
    
    const response=await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user-info`,{
        method:"GET",
        headers:{
            'Content-Type': 'application/json',
            'Cookie': `BlogJwt=${cookie}`
        } 
    })
    //not authorized
    if (!response.ok) {
         return NextResponse.redirect(new URL(`/auth/signin`,request.url))
    }

    //authorized
    const user =await response.json()

    

}
export const config = {
    matcher: ["/blog/create","/dashboard"]
      
  }