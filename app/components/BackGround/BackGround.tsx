import React from 'react'
import Image from 'next/image'
import background from '../../../public/images/bg.jpg'
export default function BackGround() {
  return (
    <>
<Image
    alt='website background'
    src={background}
    placeholder='blur'
    quality={100}
    fill
    sizes='100vw'
    style={{
        objectFit:'cover',
        zIndex: -1
    }}
    />
    </>
   
  )
}
