import { ArrowRight } from 'lucide-react'
import Image from 'next/image.js'
import Link from 'next/link.js'

const BlogCard = ({blog}) => {
  return (
    <Link href={blog._id} className='bg-gray-200 p-2 rounded-lg'>
        <div className='bg-gray-400 w-full aspect-square rounded-lg relative'>
            <Image src={blog.image} fill alt='blog pc'/>
        </div>
        <div className='p-2'>
            
            <span className='text-xs font-medium'>{blog.userId.email}</span>
            <h6 className='text-base lg:text-lg font-semibold line-clamp-2'>{blog.title}</h6>
            <span className='px-2 py-1 text-xs border border-black rounded-lg mt-2 font-medium'>{blog.categoryId.title}</span>
            
            
        </div>
    </Link>
  )
}

export default BlogCard