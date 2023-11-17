import React, { createContext, useEffect, useState } from "react";
import Search from "./Search";
import BookMarks from "./BookMarks";
import axios from "axios";
import PopUp from "./PopUp"; // Corrected the component name
import Settings from "./Settings";
export const MainContext = createContext();
const Main = () => {
  const [search, setSearch] = useState("");
  const [showDetails, setShowDetails] = useState(null);
  const [bookMarks, setBookMarks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/search`, {
          params: {
            search: search,
          },
        }).then((response) => {
          const newResults = response.data.data.map((result) => ({
            _id: result._id,
            title: result.title,
            description: result.description,
            url: result.url,
            colorCode: result.categoryInfo.colorCode,
          }));
          setBookMarks(newResults);
        }).catch((error) => {console.error(error);});
    };
    fetchData();
  }, [search]);
  return (
    <MainContext.Provider value={{ search, setSearch, bookMarks, setShowDetails, showDetails }}>
      <Search />
      <BookMarks />
      {showDetails && (
        <PopUp onClose={() => {setShowDetails(null)}}>
          <Settings showDetails={showDetails} />
        </PopUp>
      )}
    </MainContext.Provider>
  );
};

export default Main;
