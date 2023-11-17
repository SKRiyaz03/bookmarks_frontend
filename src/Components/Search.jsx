import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "./Main";
import Settings from "./Settings";
import PopUp from "./PopUp";
const Search = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setSearch, setShowDetails, showDetails } = useContext(MainContext);
  const[showSettings, setShowSettings] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/tags`
        );
        setTags(response.data.data);
      } catch (err) {
        setError(err.message || "Error fetching tags");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (<div className="w-100 bg-green-200 p-3 flex justify-around">Loading...</div>);
}
  if (error) {
    return (<div className="w-100 bg-red-200 p-3 flex justify-around">Error...</div>);
  }
  return (
    <div className="w-100 bg-green-200 p-3 flex justify-around">
      <div className="flex overflow-x-auto w-3/4 mx-2 p-2 align-center justify-start">
        {tags.length > 0 &&
          tags.map((tag) => (
            <button key={tag._id} className="mx-3 px-2 py-1 rounded" style={{ background: tag.colorCode }} onClick={() => {setSearch(tag.name)}} title={tag.description}>{tag.name}</button>
          ))}
      </div>
      <input type="text" placeholder="Search" className="rounded text-center" onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button className="mx-3 bg-red-200 px-2 py-1 rounded" onClick={(e)=>{setSearch("")}}>Reset Search</button>
      <button className="bg-green-300" onClick={()=>{setShowDetails(null); setShowSettings(true)}}>Add BookMark</button>
      {showSettings && (
        <PopUp onClose={() => {setShowDetails(null); setShowSettings(false)}} >
          <Settings />
        </PopUp>
      )}
    </div>
  );
};

export default Search;
