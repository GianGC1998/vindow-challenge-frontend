import { FC } from "react";
import "./styles.css";

export const CardSkeleton: FC = () => {
  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 ">
      <div className="card w-100 h-100">
        <div className="card-body">
          <p className="card-title placeholder-glow">
            <span className="placeholder col-12 h-100"></span>
          </p>
          <div className="card-image w-100 rounded-2 placeholder-glow">
            <span className="placeholder col-12 h-100" />
          </div>
          <p className="card-text mt-1 placeholder-glow">
            <span className="placeholder col-12" />
            <span className="placeholder col-12" />
            <span className="placeholder col-12" />
            <span className="placeholder col-12" />
          </p>
        </div>
        <p className="pe-3 pb-3 pt-2 placeholder-glow text-end">
          <span className="placeholder col-4" />
        </p>
      </div>
    </div>
  );
};
