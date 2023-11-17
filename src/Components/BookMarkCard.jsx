import React from "react";
import { IoMdSettings } from 'react-icons/io';
const BookMarkCard = ({ title, url, color, description, handleOptions, id }) => {
  return (
    <div  className=" text-slate-800 px-5  w-full rounded m-1" style={{backgroundColor: color}}>
      <div className="py-6 text-slate-800  w-full flex rounded m-1 justify-around">
        <div className="left w-1/2 flex justify-between text-xl font-bold">
          <h3>{title}</h3>
          <a href={url} target="_blank" rel="noopener noreferrer">URL</a>
        </div>
        <button className=" px-3 rounded text-3xl" onClick={() => {handleOptions(id);}}><IoMdSettings size={32} /></button>
      </div>
      <p className="w-full">{description}</p>
    </div>
  );
};

export default BookMarkCard;
