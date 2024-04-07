import React from "react";

import { Accordion, Card, Button } from 'react-bootstrap';
import CustomAccordion from "./CustomAccordion";
import Faq_img from "../styles/sass/images/landing-page/faq.png"

import Image from "next/image";
const Faq = () => {

  return (
    <>
      <section className="lyt-section typ-faq">
        <div className="container faq-bg">
          <div className="row">
            <div className="col-lg-9 m-auto">
                <CustomAccordion />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Faq;