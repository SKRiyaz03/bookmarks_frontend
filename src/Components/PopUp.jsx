import React from 'react';
const PopUp = ({ onClose, children }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="bg-black bg-opacity-50 absolute inset-0" onClick={onClose}></div>
      <div className="bg-white p-6 rounded shadow-md z-10">
        <button className="absolute top-2 right-2 text-slate-200 font-extrabold text-5xl hover:text-white cursor-pointer" 
        onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default PopUp;
