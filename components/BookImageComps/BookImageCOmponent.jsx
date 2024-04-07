import Image from 'next/image'
import React from 'react'
import loginBanner from "../../styles/sass/images/landing-page/banner_login.png";

const BookImageCOmponent = () => {
    return (
        <div>
            <div className="">
                <Image src={loginBanner} alt="book" className="img-fluid" />
            </div>
        </div>
    )
}

export default BookImageCOmponent