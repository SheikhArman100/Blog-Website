import React from 'react'
import CreateBlogForm from './CreateBlogForm.js'

const CreateBlog = () => {
  return (
    
    <section className="py-4 md:py-8 px-4 sm:px-8 lg:px-[2rem] xl:px-[4rem]  flex-1 flex flex-col items-center">
         <h2 className="text-2xl md:text-4xl font-semibold">Create Blog</h2>
         <CreateBlogForm/>
    </section>
      
  )
}

export default CreateBlog