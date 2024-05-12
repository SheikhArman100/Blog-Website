import { clsx } from "clsx"
import { cookies } from "next/headers.js"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// export const userInfo=async()=>{
//   const cookieStore = cookies()
//   const token = cookieStore.get('BlogJwt')?.value

//   const response=await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user-info`,{
//     method:"GET",
//     headers:{
//               'Content-Type': 'application/json',
//               'Cookie': `BlogJwt=${token}`
//           }
//   })
//   if(!response.ok){
//     return
//   }
//   const user=await response.json()
//   return user
// } 