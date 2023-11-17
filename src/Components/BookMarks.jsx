import React, { useContext } from "react";
import { MainContext } from "./Main";
import BookMarkCard from "./BookMarkCard";
const BookMarks = () => {
  const { bookMarks, setShowDetails } = useContext(MainContext);
  const handleOptions = (id) => {
    setShowDetails(id);
    console.log(id);
  };
  return (
    <div className="w-screen p-2">
      {bookMarks &&
        bookMarks.map((bookMark, idx) => (
          <BookMarkCard key={idx} id={bookMark._id} title={bookMark.title} url={bookMark.url} color={bookMark.colorCode} description={bookMark.description} handleOptions={handleOptions}/>
        ))}
    </div>
  );
};

export default BookMarks;
