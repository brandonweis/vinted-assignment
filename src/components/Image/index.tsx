import { useCallback, useRef, useState } from "react";
import "./index.css";

import { PhotoType } from "../../types";

interface ImageProps {
  photo: PhotoType;
}

const Image = ({ photo }: ImageProps) => {
  const [fav, setFav] = useState<Boolean>(false);
  const blurRef = useRef<HTMLDivElement | null>(null);

  const handleFav = useCallback(() => {
    setFav((prev) => !prev);
  }, [setFav]);

  const handleImageLoad = useCallback(() => {
    blurRef.current?.classList.add("loaded");
  }, []);

  return (
    <figure>
      <div
        ref={blurRef}
        className="blur-load"
        style={{
          backgroundImage: `url(https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_s.jpg)`,
        }}
      >
        <img
          onLoad={handleImageLoad}
          className="background"
          src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`}
          loading="lazy"
          alt={photo.title}
        />
      </div>
      <div className="cover">
        <h5 className="italic margin0">{photo.title}</h5>
        <hr className="underline" />
        <h5 className="margin0">{photo.owner}</h5>
        <button className="favourite" onClick={handleFav}>
          {fav ? "Favourited" : "Favourite"}
        </button>
      </div>
    </figure>
  );
};

export default Image;
