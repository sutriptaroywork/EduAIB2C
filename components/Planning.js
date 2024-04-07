import React from "react";
import task_schedule from "../styles/sass/images/landing-page/task-schedule.png";
import using_laptop from "../styles/sass/images/landing-page/using-laptop.png";
import bots_copywriting from "../styles/sass/images/landing-page/bots-copywriting.png";
import business_strategy from "../styles/sass/images/landing-page/business-strategy.png";
import virtual_tech from "../styles/sass/images/landing-page/virtual-tech.png";
import right_arrow from "../styles/sass/images/landing-page/vector-right-arrow.svg"
import left_arrow from "../styles/sass/images/landing-page/vector-left-arrow.svg"
import green_polygon from "../styles/sass/images/landing-page/green-polygon.svg"
import purple_polygon from "../styles/sass/images/landing-page/purple-polygon.svg"
import orange_polygon from "../styles/sass/images/landing-page/orange-polygon.svg"

import Image from "next/image";

const data = [
  // {
  //   title: "How does it work?",
  //   content: "Easily upload any file – whether it's a PDF or a YouTube video link. Simply choose the file from anywhere and upload it and experience the magic of two-way interaction",
  //   image: using_laptop,
  //   id: "about"
  // },
  {
    title: "The Future Of Learning",
    content: "Elevate your learning experience with the blend of concise summarization, AI curated assessment tests and 24/7 Human like assistance",
    features: [
      "Personalized Tutoring Session",
      "Engaging Learning Methods",
      "Interactive Quizzes",
    ],
    image: bots_copywriting,
    id: "feature"
  },
  // {
  //   title: "Plan, Track And Improve",
  //   content: "Simplify goal setting, tracking and performance monitoring through our state-of-the-art platform",
  //   features: [
  //     "Set you own learning goals",
  //     "Plan your studies",
  //     "Get Insight about your performance",
  //   ],
  //   checkCircle: 'typ-theme',
  //   image: business_strategy,
  // },
  // {
  //   title: "Organization made Easy",
  //   content: "Experience organized learning through our thoughtfully designed Study Planr, equipped with a Calendar, To-Do List, and Notebook",
  //   features: [
  //     "Organized your calendar",
  //     "Make your To Do List",
  //     "Save your important notes",
  //   ],
  //   checkCircle: 'typ-orange-theme',
  //   image: task_schedule,
  // },
  // {
  //   title: "Learning Gamified",
  //   content: "Enhance your learning experience through our Gamified models comprising of quizzes, IQ Test",
  //   features: [
  //     "Gamified features of Quizzes, IQ Test",
  //     "Compete with your friends",
  //     "Share your accomplishments",
  //   ],
  //   checkCircle: 'typ-theme',
  //   image: virtual_tech,
  // },
];

const lasIndex = data.length - 1;
const Planing = () => {
  let counter = 0;

  return (
    <section className="lyt-section typ-feature">
      <div className="container">
        {data.map((section, index) => {
          const isEven = counter % 2 === 0;
          counter++;

          return (
            <div
              key={index}
              className="row custom-container"
              id={section.id}
            >
              <div className="col-lg-5 col-md-6">
                <div className="content-part">
                  <h2 className="bs-heading max-wd-287">{section.title}</h2>
                  <p className="bs-para">{section.content}</p>
                  {section.features &&
                    section.features.map((feature, fIndex) => (
                      <div className="txt-circle" key={fIndex}>

                        <div className={`circle ${section.checkCircle}`}>
                          &#10003;
                        </div>
                        <span className="text">{feature}</span>
                      </div>
                    ))}
                </div>
              </div>
              <div className="col-lg-5 col-md-6">
                <div>
                   <Image src={section.image} alt={section.title}
                    className="img-fluid"/>
                </div>
              </div>
              {
                lasIndex !== index ? <div className="vectors">
                    <Image   src={isEven ? right_arrow : left_arrow}
                     alt="arrow"
                     style={{ display: 'block', margin: 'auto' }}
                     className="arrow-img"
                     />
                </div> : null
              }

            </div>
          );
        })}
        {/* <div className="polygon-vector1">
          <Image src={green_polygon} alt="green_polygon" className="img-fluid" />
          
        </div>
        <div className="polygon-vector2">
          <Image src={purple_polygon} alt="purple_polygon" className="img-fluid" />
        </div>
        <div className="polygon-vector3">
          <Image src={orange_polygon} alt="orange_polygon" className="img-fluid" />
        </div> */}
      </div>
    </section>
  )
}

export default Planing;