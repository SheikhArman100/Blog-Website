import Blogs from '@/components/Blogs.js'
import Spinner from '@/components/Spinner.js'
import React, { Suspense } from 'react'

const BLogs = ({searchParams}) => {
  const page = Number(searchParams?.page) || 1;
  return (
    <div className='w-full flex-1 py-4 px-8 lg:px-[2rem] xl:px-[4rem] flex flex-col'>
       
        <h2 className='text-3xl md:text-4xl font-bold text-center '>All blog</h2>
        <div className=' w-full flex-1 flex flex-col items-center'>
          <Suspense fallback={<div className='w-full flex-1 flex items-center justify-center'><Spinner className="size-10"/></div>}>

            <Blogs page={page}/>
          </Suspense>
        </div>
       

    </div>
  )
}

export default BLogs