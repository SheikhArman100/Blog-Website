import Link from 'next/link.js'
import React from 'react'

const Navbar = () => {
  return (
    <div className="w-full h-16  border-b border-b-border flex  items-center justify-between px-8 lg:px-[2rem] xl:px-[4rem]">
      <Link href="/" className="text-lg md:text-3xl font-bold">LOGO</Link>
      
      
    </div>
  )
}

export default Navbar