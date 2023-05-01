import { FC, SyntheticEvent, useCallback, useMemo, useState } from "react";
import { CardProps } from "./types";
import "./styles.css";

const DEFAULT_IMAGE = process.env.REACT_APP_DEFAULT_IMAGE;

const LIMIT_WORDS = 20;

export const Card: FC<CardProps> = ({ news }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { description, showEllipsis, hasImage } = useMemo(() => {
    const splitted = news.description?.split(" ") ?? [];
    return {
      description: splitted.slice(0, LIMIT_WORDS).join(" "),
      showEllipsis: splitted.length > LIMIT_WORDS,
      hasImage: Boolean(news.image?.url),
    };
  }, [news.description, news.image]);

  const onLoadImage = useCallback(() => {
    setImageLoaded(true);
  }, []);
  const onImageError = useCallback(
    (e: SyntheticEvent<HTMLImageElement, Event>) => {
      setImageError(true);
    },
    []
  );

  return (
    <>
      <div className="col-12 col-md-6 col-lg-4 col-xl-3 ">
        <div className="card w-100 h-100">
          <div className="card-body">
            <h5 className="card-title overflow-hidden fw-bold card-title-ellipsis">
              {news.title}
            </h5>
            <button
              className="card-image position-relative w-100 p-0 border-0 bg-transparent"
              data-bs-toggle={hasImage && imageLoaded ? "modal" : ""}
              data-bs-target={
                hasImage && imageLoaded ? `#modalImage-${news.id}` : ""
              }
            >
              {(!imageLoaded || !hasImage) && (
                <img
                  className="position-absolute top-0 start-0 card-image object-fit-cover w-100 rounded-2"
                  src={DEFAULT_IMAGE}
                  alt=""
                />
              )}
              {!imageError && (
                <img
                  className="card-image object-fit-cover w-100 rounded-2"
                  src={news.image?.url}
                  alt=""
                  loading="lazy"
                  onLoad={onLoadImage}
                  onError={onImageError}
                />
              )}
            </button>
            <p className="card-text mt-1">
              {description}
              {showEllipsis ? "..." : ""}
            </p>
          </div>
          <div className="pe-3 pb-3 pt-2">
            <a
              href={news.url}
              target="_blank"
              rel="noreferrer"
              className="text-end w-100 text-decoration-none float-end"
            >
              Read more...
            </a>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id={`modalImage-${news.id}`}
        tabIndex={-1}
        aria-labelledby="modalImgeLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <img src={news.image?.url} alt="" className="img-fluid w-100" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
