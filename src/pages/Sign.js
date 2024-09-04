import React, { useEffect, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { getSign } from '../redux/features/user/signSlice';
import { getData } from '../redux/features/user/signSlice';

const Sign = () => {
  const [showPassword,setShowPassword] = useState(false)
  const [showConfirmPassword,setShowConfirmPassword] = useState(false)
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [image,setImage]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
const dispatch=useDispatch()
const datasing=useSelector((state)=>state.sign.data)
console.log(datasing);

useEffect(()=>{
    dispatch(getData())
},[dispatch])

  
    const navigate = useNavigate()

    const handleImage=(e)=>{
        console.log(e.target.files[0]);
        const reader=new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload=()=>{
            setImage(reader.result)
        }
        reader.onerror=error=>{
            console.log("errror",error)
        };
    }

    const handleSubmit=async(e)=>{        
        e.preventDefault()
        
        const data={
            email : email,
            password : password,
            name : name,                        
            image:image     
          }          
          dispatch(getSign(data))
        
    }
  

  return (
    <section id='signup'>
        <div className='mx-auto container p-4'>

            <div className='bg-white p-5 w-full max-w-sm mx-auto'>

                    <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                        <div>
                            <img src={image || loginIcons} alt='login icons'/>
                        </div>
                        <form>
                          <label>
                            <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                              Upload  Photo
                            </div>
                            <input type='file' className='hidden' onChange={handleImage}/>
                          </label>
                        </form>
                    </div>

                    <form className='pt-6 flex flex-col gap-2' >
                      <div className='grid'>
                              <label>Name : </label>
                              <div className='bg-slate-100 p-2'>
                                  <input 
                                      type='text' 
                                      placeholder='enter your name' 
                                      name='name'
                                      value={name}
                                      onChange={(e)=>setName(e.target.value)}
                                      required
                                      className='w-full h-full outline-none bg-transparent'/>
                              </div>
                          </div>
                        <div className='grid'>
                            <label>Email : </label>
                            <div className='bg-slate-100 p-2'>
                                <input 
                                    type='email' 
                                    placeholder='enter email' 
                                    name='email'
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    required
                                    className='w-full h-full outline-none bg-transparent'/>
                            </div>
                        </div>

                        <div>
                            <label>Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder='enter password'
                                    value={password}
                                    name='password' 
                                    onChange={(e)=>setPassword(e.target.value)}
                                    required
                                    className='w-full h-full outline-none bg-transparent'/>
                                <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                <FaEyeSlash/>
                                            )
                                            :
                                            (
                                                <FaEye/>
                                            )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label>Confirm Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input 
                                    type={showConfirmPassword ? "text" : "password"} 
                                    placeholder='enter confirm password'
                                    value={confirmPassword}
                                    name='confirmPassword' 
                                    onChange={(e)=>setConfirmPassword(e.target.value)}
                                    required
                                    className='w-full h-full outline-none bg-transparent'/>

                                <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
                                    <span>
                                        {
                                            showConfirmPassword ? (
                                                <FaEyeSlash/>
                                            )
                                            :
                                            (
                                                <FaEye/>
                                            )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6' onClick={(e)=>handleSubmit(e)}>Sign Up</button>

                    </form>

                    <p className='my-5'>Already have account ? <Link to={"/login"} className=' text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>
            </div>


        </div>
    </section>
  )
}

export default Sign