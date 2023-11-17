import React, { useContext, useState, useEffect } from "react";
import { MainContext } from "./Main";
import axios from "axios";

const Settings = ({ showDetails }) => {
  const [currentBookMark, setcurrentBookMark] = useState(null);
  const { bookMarks, setSearch, setShowDetails } = useContext(MainContext);
  const [tags, setTags] = useState([]);

  const handleInputChange = (e) => {
    setcurrentBookMark({
      ...currentBookMark,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/bookmark/update/${showDetails}`, {
        title: currentBookMark.title,
        description: currentBookMark.description,
        url: currentBookMark.url,
        tag: currentBookMark.tag,
      });
      
      window.location.reload();
      setShowDetails(null);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handlenewBookMark = async (e) => {
    e.preventDefault();
  
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/bookmark/create`, {
        title: currentBookMark.title,
        description: currentBookMark.description,
        url: currentBookMark.url,
        tag: currentBookMark.tag,
      });
      window.location.reload();
      setShowDetails(null);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleSelectChange = (event) => {
    const selectedTag = event.target.value;
    const selectedTagColor = tags.find(
      (tag) => tag.name === selectedTag
    )?.colorCode;
    event.target.style.background = selectedTagColor;
  };
  const handleDelete = async() =>{
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/bookmark/delete/${showDetails}`)
    .then((response) => {
      console.log(response);
    })
    .catch(err => {
      console.error(err);
    });
    setSearch("");
    window.location.reload();
    setShowDetails(false);
  }

  useEffect(() => {
    const getTags = async () => {
      await axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/tags`)
        .then((response) => {
          const currentTags = response.data.data.map((tag) => ({
            colorCode: tag.colorCode,
            name: tag.name,
          }));
          setTags(currentTags);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const getDetails = async (id) => {
      bookMarks.map((bookMark) => {
        if (bookMark._id === id) {
          setcurrentBookMark(bookMark);
          return null;
        }
        return null;
      });
    };

    getDetails(showDetails);
    getTags();
  }, [showDetails, bookMarks]);



  return (
    <form className="flex flex-col bg-green-100 p-10" onSubmit={handleSubmit}>
      <label
        className="text-gray-700 font-bold mb-1 bg-transparent"
        htmlFor="title"
      >
        Title
      </label>
      <input
        className="border rounded py-2 px-3 text-grey-800 mb-2"
        required
        type="text"
        defaultValue={currentBookMark?.title || ""}
        name="title"
        id="title"
        placeholder="Title"
        onChange={handleInputChange}
      />
      <label
        className="text-gray-700 font-bold mb-1 bg-transparent"
        htmlFor="title"
      >
        URL
      </label>
      <input
        className="border rounded py-2 px-3  mb-2 text-grey-800"
        required
        type="url"
        defaultValue={currentBookMark?.url || ""}
        name="url"
        id="url"
        placeholder="url"
        onChange={handleInputChange}
      />
      <label
        className="text-gray-700 font-bold mb-1 bg-transparent"
        htmlFor="title"
      >
        Description
      </label>
      <input
        className="border rounded py-2 px-3  mb-2 text-grey-800"
        required
        type="text"
        defaultValue={currentBookMark?.description || null}
        name="description"
        id="description"
        placeholder="description"
        onChange={handleInputChange}
      />
      <label
        className="text-gray-700 font-bold mb-1 bg-transparent"
        htmlFor="title"
      >
        {" "}
        Tags{" "}
      </label>
      <select
        className="border rounded py-2 px-3  mb-2 text-grey-800"
        required
        name="tag"
        id="tag"
        onChange={(event) => {
          handleInputChange(event);
          handleSelectChange(event);
        }}
        value={currentBookMark?.tag || ""} // Provide a default value
        style={{
          background: tags.find((tag) => tag.name === currentBookMark?.tag)
            ?.colorCode,
        }}
      >
        {tags.map((tag, idx) => (
          <option
            key={idx}
            value={tag.name}
            style={{ background: tag.colorCode }}
          >
            {tag.name}
          </option>
        ))}
      </select>
      {/* ... (other form fields) */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-10 rounded"
        type="submit" onClick={showDetails ? handleSubmit : handlenewBookMark}
      >
        {showDetails ? "Update BookMark" : "Add BookMark"}
      </button>
      {showDetails && (
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 my-10 rounded"
          type="submit"
          onClick={handleDelete}
        >
          Delete
        </button>
      )}
    </form>
  );
};

export default Settings;
