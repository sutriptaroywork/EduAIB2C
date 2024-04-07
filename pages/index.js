import React from "react";
import { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import book from "../styles/sass/images/landing-page/BOOK.png";
import loginBanner from "../styles/sass/images/landing-page/banner_login.png";
import logo from "../styles/sass/images/landing-page/logo.png";
import google from "../styles/sass/images/landing-page/Google.svg";
import Banner from "../components/Banner";
import Planning from "../components/Planning";
import UserCount from "../components/UserCount";
import AdvancedFeature from "../components/AdvancedFeature";
import Testimonial from "../components/Testimonial";
import Premium from "../components/Premium";
import CardInterface from "../components/CardInterface";
import Faq from "../components/Faq";
import Link from 'next/link'
import Image from "next/image";
import TypePlan from "../components/TypePLan";
import Header from "../components/CommingSoonComps/Header";
import Footer from "../components/CommingSoonComps/Footer";

const Index=()=>{

  const [userToken,setUserToken] = useState(null)
  useEffect(()=>{
    const userTokened = localStorage.getItem("userToken");
    if(userTokened){
      setUserToken(userTokened)
    }
  },[])
  return(
    <>
 
      <Header comingFromSubscribe={true} />
      {/* <Banner /> */}
      <Planning />
      {/* <UserCount /> */}
      {/* <AdvancedFeature /> */}
      {/* <Testimonial /> */}
      {/* <Premium /> */}
      {/* <TypePlan /> */}
      {/* <CardInterface /> */}
      {/* <Faq /> */}
      {/* <Footer userToken={userToken}/> */}
      
    </>
  )
}

export default Index;
