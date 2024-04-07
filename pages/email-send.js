import React, { useState, useEffect } from 'react';
import loginBanner from "../styles/sass/images/landing-page/login-banner.png";

import sendMail from "../styles/sass/images/landing-page/sendMail.png"

import Link from 'next/link'
import Image from "next/image";
import BookImageCOmponent from '../components/BookImageComps/BookImageCOmponent';

const ResetEmail = () => {
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
                                            {/* <img src={sendMail} alt={sendMail}  className='img-fluid'/> */}
                                            <Image src={sendMail} alt={sendMail} className="img-fluid"/>
                                        </div>
                                        <h2 className='title'>Password reset e-mail has been sent</h2>
                                        <p className='desc'>A reset password link has been send to your e-mail address</p>
                                        {/* <button className='backBtn'>

                                        </button> */}
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ResetEmail;
