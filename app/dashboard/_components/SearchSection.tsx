import React from 'react'
import {Search} from 'lucide-react'
function SearchSection({onSearchInput}:any) {
  return (
    <div className='p-10 bg-gradient-to-br from-purple-500 via-purple to-blue-600 flex flex-col justify-center items-center'>
        <h1 className='text-4xl font-bold'>Browse Templates</h1>
        <p>What would you like to create today?</p>
        <div className='w-full '>
            <div className='flex gap-2 items-center p-2 border rounded-md bg-white my-5'>
                <Search className='text-primary'/>
                <input type="text" placeholder="Search"
                onChange={(event)=>onSearchInput(event.target.value)}
                className="bg-transparent w-full outline-none text-black"/>
                
            </div>
        </div>
    </div>
  )
}

export default SearchSection