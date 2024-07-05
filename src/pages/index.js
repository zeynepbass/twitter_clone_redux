import React from "react";
import RightBar from "../component/rightBar";
import LeftBar from "../component/leftBar";
import Section from "../component/Section";
import Footer from "../component/Footer";
import "./style.css";
const Index = () => {
  return (
    <>
    <div style={{display:"flex"}}>
      <LeftBar />

      <Section />

      <RightBar />
   
    </div>
       <Footer />
       </>
  );
};

export default Index;
