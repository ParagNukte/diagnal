/* eslint-disable react/prop-types */
import { useCallback, useState } from "react";

function NavBar({ handleSearchData }) {
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  const handleSearch = useCallback(
    (event) => {
      setSearchKey(event.target.value);
      handleSearchData(event.target.value);
    },
    [handleSearchData]
  );
  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-12 w-full bg-transparent fixed mb-4"
      style={{
        backgroundImage: "url('/nav_bar.png')",
        backgroundSize: "100% 100%",
      }}
    >
      <div className=" flex justify-between items-center h-full px-4 bg-transparent">
        <div className=" flex gap-4 items-center bg-transparent">
          <img src="Back.png" alt="Back" className="w-4 h-4 bg-transparent" />
          <p className="bg-transparent">Romantic Comedy</p>
        </div>
        <div className="w-50 bg-transparent">
          {searchClicked ? (
            <div className="relative flex">
              <input
                type="text"
                autoFocus
                placeholder="Type something"
                value={searchKey}
                aria-label="Search input"
                className="bg-white text-black focus:ring-2 rounded-md pl-2 pr-8 w-40"
                onBlur={() => setSearchClicked(false)}
                onChange={handleSearch}
                onKeyDown={(event) =>
                  event.key === "Enter" ? setSearchClicked(false) : null
                }
              />
              <button
                className="absolute text-black right-2 top-1/2 transform -translate-y-1/2"
                type="button"
                onClick={() => setSearchKey("")}
              >
                OK
              </button>
            </div>
          ) : (
            <img
              src="search.png"
              alt="Search"
              className="bg-transparent w-5 h-5"
              onClick={() => setSearchClicked(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
