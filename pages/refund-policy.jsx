
import React from "react";
import Image from "next/image";
import logo from "/styles/sass/images/landing-page/dashboard_icon.svg";



const RefundPolicy = () => {
    return (
        <>
            <section className="bs-info">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 col-12 m-auto">
                            <Image src={logo} alt="logo" className="logo" />
                            <h1 className="title">Refund Policy</h1>
                            <div className="section">
                                <p
                       
                                >At DreamsAI Innovation Private Limited, we hold our customers in the highest regard and are dedicated to delivering exceptional services. We strive to offer unparalleled, distinctive solutions to all our users. Please carefully review the following policies regarding payments, liability, and user discretion:</p>
                            </div>
                            <div class="section">
                                <ul className="subtitle-list">
                                
                                    <li><span className="dark">Non-Refundable Payments:</span> Any payments, whether made in full or in part, for our services or fees are strictly non-refundable. Regardless of the situation, including but not limited to technical issues or any other concerns, refunds will not be provided.</li>
                                    <li><span className="dark">User Responsibility:</span> The user acknowledges that all transactions conducted through our platform are undertaken at their own discretion. Users are fully aware of the inherent risks and the features provided by our platform. We cannot be held responsible for any outcomes resulting from user-initiated transactions.</li>
                                    <li><span className="dark">Our Commitment Beyond Monetary Value:</span> While we do not commit to refunds, our dedication to providing exceptional value to our clients goes beyond monetary considerations. We uphold strong work ethics, trading integrity, honesty, and transparent representation, which are fundamental principles in our policies.</li>
                                    <li><span className="dark">Prior Recommendations:</span> We strongly advise our visitors and potential clients to take the following steps before making a payment:</li>

                                
                                    <ul className="subtitle-list">
                                        <li className="mb-1">Carefully read all information about our services and the support we offer to our users.</li>
                                        <li className="mb-1">Familiarize yourself with our Terms and Conditions. </li>
                                        <li className="mb-1">Review our Privacy Policy and Refund Policy.</li>
                                    </ul>
                                  

                                </ul>
                            </div>
                            <div class="section">
                                <p>Our aim is to ensure that every interaction with us is built on trust, transparency, and a commitment to delivering the highest quality services.</p>
                                <p>Thank you for choosing DreamsAI Innovation Private Limited. We look forward to serving you with excellence.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default RefundPolicy;