import React from 'react'

 const Button = ({value,type}) => {
  return (
    <div><button className='bg-greenColor   outline-none rounded-full px-8 py-2 text-[15px] text-white  ' type={type} >{value}</button></div>
  )
}
export default Button;
