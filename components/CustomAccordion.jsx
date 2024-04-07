import React, { useState, useEffect } from "react";
import accordionArrow from "../styles/sass/images/landing-page/accordion-arrow.svg"
import { Link as ScrollLink } from "react-scroll";
import { useRouter } from 'next/router';


const CustomAccordion = ({hideTitle}) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [viewportWidth, setViewportWidth] = useState(0);
    const router = useRouter();


    const toggleAccordion = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    useEffect(() => {
        const handleResize = () => {
            setViewportWidth(window.innerWidth);
        };
        setViewportWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    const accordionItems = [
        {
            title: "What is shikshaML?",
            content: "shikshaML is state of the art AI learning platform offering host of features like concise summarization, 24/7 human like personal tutor, AI curated assessment test, multi-lingual etc",
        },
        {
            title: "Is shikshaML platform suitable for learners of all ages and backgrounds?",
            content: "Yes. shiskhaML platform enables learners across all age groups from class 5 to working adults",
        },
        {
            title: "How can shikshaML powered school help a student",
            content: "Through shikshaML’s interactive platform, schools can offer personalized learning experiences that is adapt to each student’s individual learning styles. It can also offer tailored professional development opportunities for teachers",
        },
        {
            title: "How does shikshaML help students become ready for competitive world?",
            content: "Through interactive learning, shikshaML cultivates the curiosity in student. Moreover the multi-lingual solutions and real life application makes learning more enriching for students. It also empower students to continually learn, adapt, and thrive in a rapidly changing future landscape",
        },

        {
            title: "How can parents stay involved in their child's learning journey through your platform?",
            content: "Parents do get the access to dashboard through which they can monitor performance of their chid in terms of subjects learned, number of hours spent, number of contents viewed etc over different timeframe",
        },


        {
            title: "Can I access the platform on different devices, such as smartphones and tablets?",
            content: "Absolutely! shiskhaML is a login-based platform which can be accessed through any device",
        },

        {
            title: "Is there a trial period or demo available before committing to a subscription?",
            content: "We offer 7 days free trial period to experience the state-of-the-art interactive platform",
        },

        {
            title: "What is your pricing model?",
            content: (
                <span>
                    {" "}
                    <ScrollLink
                        to="pricing-plan"
                        spy={true}
                        smooth={false}
                        offset={viewportWidth <= 768 ? -200 : -100}
                        duration={0}
                        className="nav-link"
                        onClick={()=> router.push("/coming-soon") }
                    >
                        Please check our pricing <span style={{ textDecoration: "underline", color: "#ffcc02" }}>here</span>
                    </ScrollLink>
                </span>
            ),
        },

    ];

    return (
        <div className="bs-accordion custom-accordion">
            { hideTitle ? null : (
            <h2 className="bs-heading typ-faq">Frequently asked questions</h2>
)}
            {accordionItems.map((item, index) => (
                <div
                    key={index}
                    className={`accordion-item cursor-pointer ${activeIndex === index ? "active" : ""}`}
                    onClick={() => toggleAccordion(index)}
                >
                    <div
                        className="accordion-header"
                    >
                        {item.title}
                    </div>
                    {activeIndex === index && (
                        <div className="accordion-content">{item.content}</div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CustomAccordion;
