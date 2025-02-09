import { decriptDetailsFromCookies } from '@/utils/authentication'
import React from 'react'

const Page = async () => {
    const details = await decriptDetailsFromCookies();
  return (
    <div>
          home
          {details?.email}
          {details?.name}
    </div>
  )
}

export default Page
