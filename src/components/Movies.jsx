import { useCallback, useEffect, useMemo, useState } from "react";
import NavBar from "./NavBar";
import PosterCard from "./PosterCard";
import InfiniteScroll from "react-infinite-scroll-component";

function Movies() {
  const [movieData, setMovieData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [allMovies, setAllMovies] = useState(0);
  const [error, setError] = useState(null);
  const [handleSearch, setHandleSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchData(pageCount); 
  }, []);

  const handleSearchData = useCallback((data) => {
    setHandleSearch(data);
    setIsSearching(data.length > 0);
  }, []);

  const fetchData = async (pageNumber) => {
    try {
      const response = await fetch(
        `https://test.create.diagnal.com/data/page${pageNumber}.json`
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      const content = data.page["content-items"].content;

      setMovieData((prevData) => [...prevData, ...content]);
      setAllMovies(data.page["total-content-items"]);
      setPageCount((prevCount) => prevCount + 1);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch movies. Please try again later.");
    }
  };

  const filteredMovies = useMemo(() => {
    return movieData.filter((movie) =>
      movie.name.toLowerCase().includes(handleSearch.toLowerCase())
    );
  }, [movieData, handleSearch]);

  return (
    <div>
      <NavBar handleSearchData={handleSearchData} />
      {error && <div className="error-message">{error}</div>}
      {isSearching ? (
        <div className="grid grid-cols-3 gap-4 m-2 mt-12 text-xl">
          {filteredMovies.map((item, index) => (
            <PosterCard
              key={index}
              posterImage={
                item["poster-image"] === "posterthatismissing.jpg"
                  ? "placeholder_for_missing_posters.png"
                  : item["poster-image"]
              }
              posterName={item.name}
            />
          ))}
        </div>
      ) : (
        <InfiniteScroll
          dataLength={movieData.length} 
          next={() => fetchData(pageCount)}
          hasMore={pageCount <= 3 && movieData.length < allMovies} 
        >
          <div className="grid grid-cols-3 gap-4 m-2 mt-12 text-xl">
            {movieData.map((item, index) => (
              <PosterCard
                key={index}
                posterImage={
                  item["poster-image"] === "posterthatismissing.jpg"
                    ? "placeholder_for_missing_posters.png"
                    : item["poster-image"]
                }
                posterName={item.name}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}

export default Movies;
