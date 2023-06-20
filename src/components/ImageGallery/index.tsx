import { useEffect, useState, useCallback } from "react";
import "./index.css";

import Image from "../Image";
import { PhotoType } from "../../types";
import Loader from "../Loader";

const dataLoadingStates = {
  INITIAL: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: 3,
};

const ImageGallery = () => {
  const [state, setState] = useState(dataLoadingStates.INITIAL);
  const [data, setData] = useState<PhotoType[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getImages() {
      if (state === dataLoadingStates.LOADING) return;

      const url = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=a394f39b62d9d2b8710a3e67aa380d7a&per_page=9&page=${page}&format=json&safe_search=1&nojsoncallback=1`;

      try {
        setState(dataLoadingStates.LOADING);
        const response = await fetch(url);
        const result = await response.json();

        setState(dataLoadingStates.SUCCESS);

        setData([...data, ...result.photos.photo]);
      } catch (error) {
        setState(dataLoadingStates.ERROR);
      }
    }

    getImages();
  }, [page]);

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight === scrollHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="center image-gallery">
        <div className="grid-container image-grid">
          {data.map((photo, index) => (
            <Image key={index} photo={photo} />
          ))}
        </div>
      </div>
      {state === dataLoadingStates.LOADING && <Loader />}
    </>
  );
};

export default ImageGallery;
