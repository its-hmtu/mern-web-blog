import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getPostsQuery } from "hooks/post";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

const SearchBar = (props) => {
  const [value, setValue] = useState("");
  const [paramsPost, setParamsPost] = useState({
    page: "",
    limit: "",
    order: "",
  });
  const { data, isLoading } = useQuery(
    getPostsQuery(paramsPost.page, paramsPost.limit, paramsPost.order)
  );

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    console.log(data);
  });

  //handle input change for search bar
  const onInputChange = (evt) => {
    setValue(evt.target.value);

    const results = data?.posts?.filter((item) =>
      item.title.toLowerCase().includes(evt.target.value.toLowerCase())
    );

    setSearchResults(results);
  };

  //handle 'enter' press event
  const onEnterKey = (evt) => {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      // search(value);
      // setValue("");
    }
  };

  return (
    <div className="position-relative">
      <input
        className="search-bar my-2 border"
        value={value}
        placeholder="Search..."
        onChange={onInputChange}
        onKeyDown={onEnterKey}
      />
      <FontAwesomeIcon
        icon={faSearch}
        className="position-absolute"
        style={{
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          color: "#333",
          cursor: "pointer",
        }}
      />

      {value && searchResults?.length > 0 && (
        <div className="search-results position-absolute w-100 bg-white">
          <ul className="search-result">
            {searchResults.slice(0,5).map((result, index) => (
              <li key={index} className="search-result__item">
                <div>@{result.author}</div>
                <strong>{result.title}</strong>
                <div>
                  {new Date(result.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
