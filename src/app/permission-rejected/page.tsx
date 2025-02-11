"use client"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import React from 'react'

const PermissionRejected = () => {
    const router = useRouter();
  return <div className='flex flex-col gap-10 items-center justify-center w-screen h-screen'>
   <Label className='text-4xl font-bold'>
   Access Denied 
   </Label>
   <Button variant="outline" onClick={()=> router.back()}>back</Button>
  </div>
}

export default PermissionRejected