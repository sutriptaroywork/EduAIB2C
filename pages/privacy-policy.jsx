
import React from "react";
import Image from "next/image";
import logo from "/styles/sass/images/landing-page/dashboard_icon.svg";


const PrivacyPolicy = () => {

    return (
        <>
            <section className="bs-info">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11 col-12 m-auto">
                        <Image src={logo} alt="logo" className="logo"/>    
                    <h1 className="title">Privacy Policy</h1>
                    <div className="section">
                        <ul>
                            <li><h2>Introduction</h2></li>
                        </ul>
                        <p>Welcome to DreamsAI Innovation Private Limited (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). Protecting your privacy and maintaining the security of your personal information is a top priority for us. This Privacy Policy is designed to explain how we collect, use, disclose, and safeguard your personal information when you use our Edtech platform and related services.</p>
                    </div>
                    <div class="section">
                        <ul>
                            <li><h2>Information We Collect</h2></li>
                        </ul>
                        <h3><span className="bold-txt">a. User-Provided Information: </span>We collect the following types of personal information when you sign up for an account, use our services, or interact with our platform:</h3>
                        <ul className="subtitle-list">
                            <li><span className="dark">Account Information:</span> Your name, email address, and a secure password to create and access your account.</li>
                            <li><span className="dark">Profile Information:</span> Information you provide to personalize your user profile, which may include a profile picture, date of birth, and contact information.</li>
                            <li><span className="dark">Payment Information:</span> If you make payments on our platform, we collect payment information, such as billing address, credit card details, or other payment methods.</li>
                            <li><span className="dark">Communication Data:</span> We may store records of your interactions with us, including messages, emails, or any other form of communication.</li>
                            <li><span className="dark">User-Generated Content:</span> Any content, such as assignments, notes, or comments, you create or upload while using our services.</li>
                        </ul>
                        <h3><span className="bold-txt">b. Information Automatically Collected: </span> When you use our platform, we automatically collect certain information, including:</h3>
                        <ul className="subtitle-list">
                            <li><span className="dark">Technical Information:</span> Your IP address, device type, browser type, operating system, and device identifiers.</li>
                            <li><span className="dark">Usage Information:</span> Data on how you interact with our platform, such as the pages you visit, the content you access, and your engagement with our features.</li>
                            <li><span className="dark">Cookies and Tracking Technologies:</span> We use cookies and similar technologies to track your activity on our platform and gather analytics data. You can manage your cookie preferences through your browser settings.</li>
                        </ul>
                    </div>
                    <div class="section">
                        <ul>
                            <li><h2>How We Use Your Information</h2></li>
                        </ul>
                        <p>We use the collected information for the following purposes:</p>
                        <ul className="subtitle-list">
                            <li><span className="dark">Providing and Improving Services:</span> To deliver our services to you, personalize your experience, and continuously enhance our platform.</li>
                            <li><span className="dark">Communication:</span> To contact you regarding important updates, support, and promotional messages, with your consent.</li>
                            <li><span className="dark">Research and Analytics:</span> To conduct research, analyze usage patterns, and improve our services.</li>
                            <li><span className="dark">Payment Processing:</span> If applicable, to process payments securely.</li>
                            <li><span className="dark">Legal Compliance:</span> To comply with legal obligations and respond to legal requests.</li>
                        </ul>
                    </div>
                    <div class="section">
                        <ul>
                            <li><h2>Sharing Your Information</h2></li>
                        </ul>
                        <p>We may share your personal information under certain circumstances:</p>
                        <ul className="subtitle-list">
                            <li><span className="dark">With Your Consent:</span> We may share information with third parties when you explicitly consent to such sharing.</li>
                            <li><span className="dark">Legal Compliance:</span> We may share data when required to comply with applicable laws, regulations, or legal processes.</li>
                            <li><span className="dark">Protection of Rights:</span> To protect our rights, safety, and the rights and safety of others, we may share information to prevent fraud, security breaches, or violations of our terms of service.</li>
                            <li><span className="dark">Business Transfers:</span> In the event of a merger, acquisition, or other business transfer, we may transfer your information as part of the transaction.</li>
                        </ul>
                    </div>
                    <div class="section">
                        <ul>
                            <li><h2>Data Security</h2></li>
                        </ul>
                        <p>We employ industry-standard security measures to safeguard your personal information from unauthorized access, disclosure, alteration, or destruction. However, it&apos;s important to note that no method of data transmission or storage is entirely secure, and we cannot guarantee absolute security.</p>
                    </div>
                    <div class="section">
                        <ul>
                            <li><h2>Your Choices</h2></li>
                        </ul>
                        <p>You have several rights regarding your personal information:</p>
                        <ul className="subtitle-list">
                            <li><span className="dark">Access and Update:</span> You can access and update your personal information through your account settings.</li>
                            <li><span className="dark">Deletion:</span> You can request the deletion of your account and associated data by contacting us.</li>
                            <li><span className="dark">Opt-Out:</span> You can opt out of receiving promotional communications from us.</li>
                            <li><span className="dark">Cookies:</span> You can manage your cookie preferences through your browser settings.</li>
                        </ul>
                    </div>
                    <div class="section">
                        <ul>
                            <li><h2>Changes to this Privacy Policy</h2></li>
                        </ul>
                        <p>We may update this Privacy Policy to reflect changes in our practices or legal requirements. We will notify you of any material changes, and the updated policy will be effective immediately upon posting.</p>
                    </div>
                    <div class="section">
                        <ul>
                            <li><h2>Contact Us</h2></li>
                        </ul>
                        <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at 
                        <a className="link" href = "mailto: support@shikshaml.com" target="_blank" rel="noreferrer"> support@shikshaml.com</a>
                        </p>
                    </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PrivacyPolicy;