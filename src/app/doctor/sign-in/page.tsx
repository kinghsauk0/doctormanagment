"use client";
import React, { useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { InputOtp } from "primereact/inputotp";
import { SignInFromType, ForgotPasswordFromType, ResetPasswordOtpAndTokenDataType } from "../../types"
import { useApp } from "@/app/context/AppProvider";
import { Routes } from "@/app/routes";
import { axiosService } from "@/app/services/axios.service";
import { ZodError } from 'zod';
import { signInUserSchema,resetPasswordSchema, otpVerifiedUserSchema, createPasswordUserSchema} from '@/app/utils/schema/ZodSchema';
import { setCookie } from "@/app/services/cookie.service";
import { useAuth } from "@/app/context/AuthProvider";
export default function Page() {
    

    
    const [signInData, setSingInData] = useState<SignInFromType>({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [forgotPasswordData, setForgotPasswordData] = useState <ForgotPasswordFromType>({
        password: '',
        confirmPassword: ''
    })
    const [forgotPasswordEmail,setForgotPasswordEmail] = useState<string>('')
    const [otp, setOtp] = useState<string | number | undefined>('');
    const [isOpen, setIsOpen] = useState<Boolean>(false);
    const [isOTP, setIsOTP] = useState<Boolean>(false);
    const [isNewPass, setIsNewPass] = useState<Boolean>(false);
    const {app} = useApp()
    const [otpData, setOtpData] = useState<ResetPasswordOtpAndTokenDataType>({
        email: null,
        token: null,
    })

    const {setUser} = useAuth()
    

    const SingInHandelOnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        setSingInData({ ...signInData, [name]: e.target.value });
      };
    
    const ForgotPasswordHandelOnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        setForgotPasswordData({ ...forgotPasswordData, [name]: e.target.value });
      };


      const handleSetResetPassword = async() => {
        console.log(otpData.email)
       try {
        if(otpData.email=== null){
           app.toastError('Server error')
           return 
        }
        const userData = {
            email: otpData.email,
            newPassword: forgotPasswordData.password,
            confirmPassword: forgotPasswordData.confirmPassword,
        }



        const validatedData = createPasswordUserSchema.parse(userData)
         console.log(validatedData)
        const {message,status} = await axiosService({
            method: 'POST',
            url: '/api/auth/change-password',
            body: validatedData
        }) 

        if(status < 210){
            app.toastSuccess(message)
            setForgotPasswordData({
                password: '',
                confirmPassword: ''
            })
            handleToggle()
        }else{
            app.toastError(message)
        }

       } catch (error) {
        console.log(error)
        if (error instanceof ZodError) {
            const newErrors: Record<string, string> = {};
            error.errors.forEach((err) => {
              if (err.path[0]) {
                newErrors[err.path[0] as string] = err.message;
              }
            });
            console.log(newErrors)
            setErrors(newErrors); 
          }else{
            app.toastError("Server Error")
          }
        }
      }



    const handleToggle = () => {
        setIsNewPass(false);
        setIsOTP(false);
        setIsOpen(!isOpen);
    };


   console.log(otpData.email)
   console.log(otpData.token)
   
   
    const handleSendOTP = async() => {
        try {
            const userData = {
                email: forgotPasswordEmail
            }

            const validatedData  = resetPasswordSchema.parse(userData)
            const {data,message,status} = await axiosService({
                method: 'POST',
                url: '/api/auth/reset-password',
                body: validatedData
            })

            if(status < 210){
               app.toastSuccess(message)
               app.toastSuccess(data.otp)
               setOtpData({
               email: data.email,
               token: data.token
               })
               setIsOTP(!isOTP);
               setForgotPasswordEmail('')
            }else{
                app.toastError(message)
            }

        } catch (error) {
            console.log(error)
        if (error instanceof ZodError) {
            const newErrors: Record<string, string> = {};
            error.errors.forEach((err) => {
              if (err.path[0]) {
                newErrors[err.path[0] as string] = err.message;
              }
            });
            console.log(newErrors)
            setErrors(newErrors); 
          }else{
            app.toastError("Server Error")
          }
        }
    };

  
    const handleNewPassToggle = async() => {
        try {
            
       if(otpData.token === null){
        app.toastError("Server error")
        return
      }
      const useData = {
       token: otpData.token,
       otp: otp
     }

      const validatedData = otpVerifiedUserSchema.parse(useData)

      const {message,status,data} = await axiosService({
        method: 'POST',
        url: '/api/auth/reset-password-verification',
        body: validatedData
      })

      if(status < 210){
          app.toastSuccess(message)
          setIsNewPass(!isNewPass);
          setOtp('')
      }else{
        app.toastError(message)
      }
      
        } catch (error) {
            console.log(error)
            if (error instanceof ZodError) {
                const newErrors: Record<string, string> = {};
                error.errors.forEach((err) => {
                  if (err.path[0]) {
                    newErrors[err.path[0] as string] = err.message;
                  }
                });
                console.log(newErrors)
                setErrors(newErrors); 
              }else{
                app.toastError("Server Error")
              }
        }
    };

    const handelSignIn = async() => {
       try {
        const userData = {
            email: signInData.email,
            password: signInData.password,
        }
         
        const  validatedData = signInUserSchema.parse(userData)
       
         const {data,status,message} = await axiosService({
            method: "POST",
            url: '/api/auth/sing-in',
            body: validatedData
         })
        
         if(status < 210){
            console.log(data)
            app.toastSuccess(message)
            setUser({doctorId: data.doctor.uid,userId: data.uid})
            setCookie("doctorId",data.doctor.uid)
            setCookie("userId",data.uid)
            if (typeof window !== 'undefined') {
                localStorage.setItem('isAuthenticated', 'isAuthenticated');
              }
             app.goTo(Routes.doctorDashboard())
             setSingInData({
                email: '',
                password: ''
             })
         }else{
            app.toastError(message)
         }
        
       } catch (error) {
        console.log(error)
        if (error instanceof ZodError) {
            const newErrors: Record<string, string> = {};
            error.errors.forEach((err) => {
              if (err.path[0]) {
                newErrors[err.path[0] as string] = err.message;
              }
            });
            console.log(newErrors)
            setErrors(newErrors); 
          }else{
            app.toastError("Server Error")
          }
        
       }
    }


    const handleSendAgin = async() => {
        if(otpData.token === null){
            app.toastError("Server error")
            return 
        }
         
        try {
            const {data, message, status} = await axiosService({
                method: 'POST',
                url: '/api/auth/reset-otp',
                body: {token: otpData.token}
            })
            
            if(status< 210){
                app.toastSuccess(`otp is ${data.otp}`)
                app.toastSuccess(message)
            }else{
                app.toastError(message)
            }
    
        } catch (error) {
            console.log(error)
            app.toastError("Server error")
        }
      }

  return (
    <>
        <div className='flex flex-col justify-between h-[100vh]'>
            <div className='h-full flex flex-col justify-center'>
                <div className='container mx-auto px-4'>
                    <div className='grid lg:grid-cols-2 grid-cols-1 gap-20 max-w-[900px] mx-auto items-center'>
                        <div className='hidden lg:block rounded-lg px-10 py-20' style={{backgroundImage:'url(/images/bg-signin.svg)', backgroundRepeat:'no-repeat', backgroundSize:'cover', backgroundPosition:'center center'}}>
                            <div className='mb-3 text-white text-4xl font-semibold'>Welcome to our community</div>
                            <div className='mb-28 text-white text-sm'>Clarity gives you the blocks & components you need to create a truly professional website.</div>
                            <div className="flex items-center gap-1 testirvw mb-6">
                                <svg
                                width="16"
                                height="16"
                                viewBox="0 0 34 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    d="M15.1631 1.26548C15.8573 -0.346443 18.1427 -0.346442 18.8369 1.26548L21.9379 8.46632C22.2275 9.13867 22.8612 9.59911 23.5901 9.66672L31.3968 10.3908C33.1443 10.5528 33.8506 12.7265 32.532 13.8848L26.6419 19.0592C26.0919 19.5423 25.8499 20.2873 26.0108 21.0015L27.7346 28.6498C28.1205 30.3619 26.2715 31.7053 24.7624 30.8092L18.0211 26.8063C17.3917 26.4326 16.6083 26.4326 15.9789 26.8063L9.23757 30.8092C7.72851 31.7053 5.87952 30.3619 6.26539 28.6498L7.98918 21.0015C8.15013 20.2873 7.90806 19.5423 7.35809 19.0592L1.46795 13.8848C0.149427 12.7265 0.85568 10.5528 2.60322 10.3908L10.4099 9.66672C11.1388 9.59911 11.7725 9.13867 12.0621 8.46632L15.1631 1.26548Z"
                                    fill="#F5BF00"
                                />
                                </svg>
                                <svg
                                width="16"
                                height="16"
                                viewBox="0 0 34 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    d="M15.1631 1.26548C15.8573 -0.346443 18.1427 -0.346442 18.8369 1.26548L21.9379 8.46632C22.2275 9.13867 22.8612 9.59911 23.5901 9.66672L31.3968 10.3908C33.1443 10.5528 33.8506 12.7265 32.532 13.8848L26.6419 19.0592C26.0919 19.5423 25.8499 20.2873 26.0108 21.0015L27.7346 28.6498C28.1205 30.3619 26.2715 31.7053 24.7624 30.8092L18.0211 26.8063C17.3917 26.4326 16.6083 26.4326 15.9789 26.8063L9.23757 30.8092C7.72851 31.7053 5.87952 30.3619 6.26539 28.6498L7.98918 21.0015C8.15013 20.2873 7.90806 19.5423 7.35809 19.0592L1.46795 13.8848C0.149427 12.7265 0.85568 10.5528 2.60322 10.3908L10.4099 9.66672C11.1388 9.59911 11.7725 9.13867 12.0621 8.46632L15.1631 1.26548Z"
                                    fill="#F5BF00"
                                />
                                </svg>
                                <svg
                                width="16"
                                height="16"
                                viewBox="0 0 34 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    d="M15.1631 1.26548C15.8573 -0.346443 18.1427 -0.346442 18.8369 1.26548L21.9379 8.46632C22.2275 9.13867 22.8612 9.59911 23.5901 9.66672L31.3968 10.3908C33.1443 10.5528 33.8506 12.7265 32.532 13.8848L26.6419 19.0592C26.0919 19.5423 25.8499 20.2873 26.0108 21.0015L27.7346 28.6498C28.1205 30.3619 26.2715 31.7053 24.7624 30.8092L18.0211 26.8063C17.3917 26.4326 16.6083 26.4326 15.9789 26.8063L9.23757 30.8092C7.72851 31.7053 5.87952 30.3619 6.26539 28.6498L7.98918 21.0015C8.15013 20.2873 7.90806 19.5423 7.35809 19.0592L1.46795 13.8848C0.149427 12.7265 0.85568 10.5528 2.60322 10.3908L10.4099 9.66672C11.1388 9.59911 11.7725 9.13867 12.0621 8.46632L15.1631 1.26548Z"
                                    fill="#F5BF00"
                                />
                                </svg>
                                <svg
                                width="16"
                                height="16"
                                viewBox="0 0 34 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    d="M15.1631 1.26548C15.8573 -0.346443 18.1427 -0.346442 18.8369 1.26548L21.9379 8.46632C22.2275 9.13867 22.8612 9.59911 23.5901 9.66672L31.3968 10.3908C33.1443 10.5528 33.8506 12.7265 32.532 13.8848L26.6419 19.0592C26.0919 19.5423 25.8499 20.2873 26.0108 21.0015L27.7346 28.6498C28.1205 30.3619 26.2715 31.7053 24.7624 30.8092L18.0211 26.8063C17.3917 26.4326 16.6083 26.4326 15.9789 26.8063L9.23757 30.8092C7.72851 31.7053 5.87952 30.3619 6.26539 28.6498L7.98918 21.0015C8.15013 20.2873 7.90806 19.5423 7.35809 19.0592L1.46795 13.8848C0.149427 12.7265 0.85568 10.5528 2.60322 10.3908L10.4099 9.66672C11.1388 9.59911 11.7725 9.13867 12.0621 8.46632L15.1631 1.26548Z"
                                    fill="#F5BF00"
                                />
                                </svg>
                                <svg
                                width="16"
                                height="16"
                                viewBox="0 0 34 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    d="M15.1631 1.26548C15.8573 -0.346443 18.1427 -0.346442 18.8369 1.26548L21.9379 8.46632C22.2275 9.13867 22.8612 9.59911 23.5901 9.66672L31.3968 10.3908C33.1443 10.5528 33.8506 12.7265 32.532 13.8848L26.6419 19.0592C26.0919 19.5423 25.8499 20.2873 26.0108 21.0015L27.7346 28.6498C28.1205 30.3619 26.2715 31.7053 24.7624 30.8092L18.0211 26.8063C17.3917 26.4326 16.6083 26.4326 15.9789 26.8063L9.23757 30.8092C7.72851 31.7053 5.87952 30.3619 6.26539 28.6498L7.98918 21.0015C8.15013 20.2873 7.90806 19.5423 7.35809 19.0592L1.46795 13.8848C0.149427 12.7265 0.85568 10.5528 2.60322 10.3908L10.4099 9.66672C11.1388 9.59911 11.7725 9.13867 12.0621 8.46632L15.1631 1.26548Z"
                                    fill="#F5BF00"
                                />
                                </svg>
                            </div>
                            <div className='text-white text-sm mb-10'> &quot;We love VCURE! Using it on a daily basis, so we already knew what a great platform it is.&quot;</div>
                            <div className='flex gap-4 items-center'>
                                <div style={{lineHeight:'0'}}>
                                    <Image src="/images/rvw1.webp" alt="" width="50" height="50"/>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <div className='font-semibold text-white text-base'>Dr. Devon Lane</div>
                                    <div className='font-semibold text-white text-xs'>Abc Hospital, Design.co</div>
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <div className="text-center flex flex-col gap-4">
                                <div>
                                    <Link href="/doctor" className='dochdrlogo'>
                                        <Image src="/images/logo.webp" alt="Image" width="250" height='50' />
                                    </Link>
                                </div>
                                <div className="text-[#667085] text-md mb-8"> Vcure sign-in allows secure access via credentials, ensuring usability and data protection.</div>
                                <div className="p-10 rounded-lg shadow-lg bg-white">
                                    {isOpen ? (
                                        <>
                                        {isOTP ? (
                                            <>{
                                                !isNewPass?
                                        <div>
                                            <div className="text-center mb-6 text-[#000] text-2xl">Type OTP</div>
                                            <div className="mb-4 flex justify-center">
                                                <InputOtp value={otp} onChange={(e) => setOtp(e.value!)}/>
                                            </div>
                                            <div className="flex justify-between items-center mb-8">
                                                <div>
                                                    <Button onClick={handleSendAgin} className="p-0 bg-transparent border-0 shadow-none text-[#000] text-xs" label="Re-send OTP"/>
                                                </div>
                                                <div>
                                                    <Button className="p-0 bg-transparent border-0 shadow-none text-[#000] text-xs" label="Return to Sign in" onClick={handleToggle}/>
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <Button className="bg-[#1D4ED8] text-[#fff] border-[#1D4ED8] shadow-none w-full" label="Submit" size="small" onClick={handleNewPassToggle}/>
                                            </div>
                                        </div>:(
                                            <>
                                                <div className="text-center mb-6 text-[#000] text-2xl">Type New Password</div>
                                                <div className="mb-8">
                                                    <FloatLabel>
                                                        <Password 
                                                        id="loginPassword" 
                                                        value={forgotPasswordData.password}
                                                        onChange={ForgotPasswordHandelOnClick}
                                                        name="password"
                                                        className="w-full" 
                                                        toggleMask />
                                                          {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
                                                        <label htmlFor="loginPassword">Password</label>
                                                    </FloatLabel>
                                                </div>
                                                <div className="mb-4">
                                                    <FloatLabel>
                                                        <Password 
                                                        id="loginPassword" 
                                                        value={forgotPasswordData.confirmPassword}
                                                        onChange={ForgotPasswordHandelOnClick}
                                                        name="confirmPassword"
                                                        className="w-full" 
                                                        toggleMask />
                                                        {errors.confirmPassword && <p className="text-red-600 text-xs mt-1">{errors.confirmPassword}</p>}
                                                        <label htmlFor="loginPassword">Confirm Password</label>
                                                    </FloatLabel>
                                                </div>
                                                <Button className="bg-[#1D4ED8] text-[#fff] border-[#1D4ED8] shadow-none w-full" label="Save" onClick={handleSetResetPassword}/>
                                            </>
                                        )}
                                        </>
                                    ) : (
                                        <div>
                                            <div className="text-center mb-6 text-[#000] text-2xl">Forget Password</div>
                                            <div className="mb-4">
                                                <FloatLabel>
                                                    <InputText
                                                    value={forgotPasswordEmail}
                                                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                                                     id="username" 
                                                     className="w-full" />
                                                    <label htmlFor="username">Email</label>
                                                </FloatLabel>
                                            </div>
                                            <div className="flex justify-end mb-8">
                                                <Button className="p-0 bg-transparent border-0 shadow-none text-[#000] text-xs" label="Return to Sign in" onClick={handleToggle}/>
                                            </div>
                                            <div className="mb-4">
                                                <Button className="bg-[#1D4ED8] text-[#fff] border-[#1D4ED8] shadow-none w-full" label="Send OTP" size="small" onClick={handleSendOTP}/>
                                            </div>
                                            <div className="flex justify-center items-center gap-2 text-xs">
                                                <div>Don&apos;t have an account?</div>
                                                <Link href="/doctor/create-account">Sign up now</Link>
                                            </div>
                                        </div>
                                    )}
                                        </>
                                    ) : (
                                        <div>
                                            <div className="text-center mb-6 text-[#000] text-2xl">Sign in</div>
                                            <div className="mb-8">
                                                <FloatLabel>
                                                    <InputText 
                                                    id="userEmail" 
                                                    className="w-full" 
                                                    value={signInData.email}
                                                     name="email"
                                                     placeholder="Enter your email"
                                                     onChange={SingInHandelOnClick} 
                                                    />
                                                     {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                                                    <label htmlFor="username">Email</label>
                                                </FloatLabel>
                                            </div>
                                            <div className="mb-4 ">
                                                <FloatLabel>
                                                    <Password 
                                                    id="loginPassword" 
                                                    className="w-full" 
                                                    toggleMask
                                                    value={signInData.password}
                                                    name="password"
                                                    onChange={SingInHandelOnClick}
                                                     />
                                                      {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
                                                    <label htmlFor="loginPassword">Password</label>
                                                </FloatLabel>
                                            </div>
                                            <div className="flex justify-end mb-8">
                                                <Button className="p-0 bg-transparent border-0 shadow-none text-[#000] text-xs" label="Forgot password?" onClick={handleToggle}/>
                                            </div>
                                            <div className="mb-4">
                                                <Button  onClick={handelSignIn}  className="bg-[#1D4ED8] text-[#fff] border-[#1D4ED8] shadow-none w-full" label="Sign In" size="small"/>
                                            </div>
                                            <div className="flex justify-center items-center gap-2 text-xs">
                                                <div>Don&apos;t have an account?</div>
                                                <Link href="/doctor/create-account">Sign up now</Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-[#1849A9] text-[#fff] py-4 text-sm hidden lg:block mt-auto'>
                <div className='container px-4 mx-auto'>
                    <div className='flex justify-between items-center gap-4'>
                        <div>
                            Contact Us: 
                            <Link href="mailto:admin@example.com" className='text-white'> admin@example.com</Link> | 
                            <Link href="tel:1-800-123-4567" className='text-white'> 1-800-123-4567</Link>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span>Follow Us: </span>
                            <Link href="" className='text-white'><i className='pi pi-facebook'></i></Link>
                            <Link href="" className='text-white'><i className='pi pi-instagram'></i></Link>
                            <Link href="" className='text-white'><i className='pi pi-twitter'></i></Link>
                        </div>
                        <div>
                            <Link href="#" className='text-white'>Terms of Use</Link> | <Link href="#" className='text-white'>Privacy Policy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
