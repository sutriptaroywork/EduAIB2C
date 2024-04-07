import React, { useState } from "react";
import Image from 'next/image';

const StickyNotes = () => {
  const [notes, setNotes] = useState('');

  const handleChange = (event) => {
    setNotes(event.target.value);
  };
  
  return (
    <>
      <div className="mod-note cursor-not-allowed">
        <h3 className="title" >Sticky Notes
          <Image src={`/plus-add-icon.svg`} alt={``} width={20} height={20} className="sticky-icon" />
        </h3>
        <textarea className="cursor-not-allowed" disabled name="" id="" placeholder="Type your notes here..." value={notes} onChange={handleChange}></textarea>
      </div>
    </>
  )
}
export default StickyNotes;