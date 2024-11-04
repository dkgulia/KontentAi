"use client"
import React,{ useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { FileClock, Home, Settings, Wallet } from 'lucide-react'
function SideNav() {

  const MenuList=[
    {name:"Home",icon:Home,path:'/dashboard'},
    {name:"History",icon:FileClock,path:'/dashboard/history'},
    {name:"Billing",icon:Wallet,path:'/dashboard/billing'},
    {name:"Settings",icon:Settings,path:'/dashboard/settings'},

  ]

  const path =usePathname();
  useEffect(()=>{
      console.log(path)
  },[])
  return (
    <div className='h-screen p-5 shadow-sm border'>
      <div className='flex justify-center'>
      <Image src={'/logo.svg'} alt='logo' width ={120} height={100}/>
      </div>

      <div className='mt-10'>
        {MenuList.map((menu,index)=>(
          <div className={`flex gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer ${path==menu.path&&'bg-primary text-white'}`}>
            <menu.icon/>
            <h2>{menu.name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideNav