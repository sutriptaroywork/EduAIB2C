import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";

const EventsList = ({ data }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="mod-list typeEvents cursor-not-allowed">
      <div
        className="table-container"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div
          className="list-header"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h2 className="title">Events</h2>

          {/* No need of filter on events */}

          {/* <Image src={`/filter-icon.svg`} alt={``} width={20} height={20} className="vector-filter" /> */}
          {showTooltip && (
            <Link
              href="#"
              className="mod-tooltip"
              style={{ opacity: "1", top: "20px", left: "50%" }}
            >
              Click to View
            </Link>
          )}
        </div>

        <div className="p-2">
          <span className="p-2">No Events</span>
        </div>

        {/* {data.map((item, index) => (
          <div key={index} className='eventList'>

            <div className='left-side'>
              <div className='img-box'>
                <Image src={`${process.env.NEXT_PUBLIC_SHIKSHAML_EVENT_IMAGE}/images/${item.image}`} className='rounded-[5px]' alt="not-found" width={50} height={50} />
              </div>
              <div className='details'>
                <p className='title'>{item.title}</p>
                <p className='subTitle'>{item.subtitle}</p>
              </div>
            </div>
            <div className='know-more'>
            Know More
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default EventsList;
