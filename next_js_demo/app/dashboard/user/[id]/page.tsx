import React from 'react'

const page = async({params}:{params:Promise<{id:string}>}) => {
    const {id}=await params;
  return (
    <div>
        <h1>showing detaisl for user #{id}</h1>
    </div>
  )
}

export default page