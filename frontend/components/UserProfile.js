'use client'
import useUserInfo from '@/lib/hooks/useUserInfo.js'
import Link from 'next/link.js'
import ProfileOption from './ProfileOption.js'

const UserProfile = () => {
  const{data}=useUserInfo()
  const user=data?.user
  return (
    <>
    {user ? (
      <div className='flex items-center gap-x-2'>
        <div className="bg-gray-400 size-10 rounded-full flex items-center justify-center text-lg font-bold">
        {user.name.split(" ").map(word => word[0]).join("")}
      </div>
      <ProfileOption/>

      </div>
      
    ) : (
      <Link href="/auth/signin" className="text-base px-6 py-3 bg-black text-white rounded-lg hover:bg-white hover:text-black hover:shadow-lg font-semibold">Sign in</Link>
    )}
  </>
  )
}

export default UserProfile