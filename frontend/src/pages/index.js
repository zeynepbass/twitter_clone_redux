import React from "react";
import RightBar from "../component/rightBar";
import LeftBar from "../component/leftBar";

import Footer from "../component/Footer";
import "./style.css";
const Index = (props) => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <LeftBar />
  
        {props.content && props.content}


        <RightBar />
      </div>
      <Footer />
    </>
  );
};

export default Index;
