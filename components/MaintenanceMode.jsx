// src/components/MaintenanceMode.js
import React from "react";
import comming_s_img from "../public/coming-soon.png";
import Image from "next/image";


function MaintenanceMode() {
  return (
    <section className="lyt-section typ-comming !h-full ">
      <div className="comming_s_img h-full">
        <Image src={comming_s_img} alt={comming_s_img} className="h-[300px] w-[350px] " />
      </div>
      <h2 className="title">Coders at Work</h2>
      <h2 className="desc">-coming Soon-</h2>
    </section>
  );
}

export default MaintenanceMode;
