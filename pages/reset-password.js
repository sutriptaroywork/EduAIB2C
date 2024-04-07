// coded by yaseen s
import React, { useState, useEffect } from 'react';
import loginBanner from "../styles/sass/images/landing-page/login-banner.png";
import resetPass from "../styles/sass/images/landing-page/resetPass.png"
import Link from 'next/link'
import Image from "next/image";
import BookImageCOmponent from '../components/BookImageComps/BookImageCOmponent';
import { useRouter } from 'next/router';


const ResetPassword = () => {
    const router = useRouter();

    return (
        <>
            <section className="lyt-section typ-authentication">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12  p-0">
                            <div className="login-left">
                                <div className='h-4/5 w-4/5 m-auto '>
                                <Image src={loginBanner} alt="book" className="img-fluid !h-full"/>
                                </div>
                                 {/* <BookImageCOmponent/> */}

                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12 mob-height p-0">
                            <div className="login-right">
                                    <div className='bs-success'>
                                        <div className='img-box'>
                                            {/* <img src={reset-pass} alt={reset-pass}  className='img-fluid'/> */}
                                            <Image src={resetPass} alt={resetPass}  className='img-fluid'/>
                                        </div>
                                        <h2 className='title'>Password reset successful</h2>
                                        <p className='desc'>You have successfully reset your password. please use your new password when logging in</p>

                                        <span  onClick={() => router.push("/login")} className='backBtn'>
                                            Back to login
                                        </span>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ResetPassword;
