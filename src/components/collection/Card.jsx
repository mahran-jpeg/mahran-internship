import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../ui/Skeleton";

function CollectionCard({ loading, collection = {}, link, index }) {
  
  const { logo, imageLink, title, floor, totalVolume } = collection;

  return loading ? (
    <Link to={`/collection/${collection.id}`} key={index} className="collection">
      <div className="collection__img">
        <Skeleton width="100%" height="100%" borderRadius={0} />
      </div>
      <div className="collection__info">
        <div className="collection__stats">
          <div className="collection__stat">
            <span className="collection__stat__label">
              <Skeleton width="48px" height="16px" />
            </span>
            <span className="collection__stat__data">
              <Skeleton width="90px" height="16px" />
            </span>
          </div>
          <div className="collection__stat">
            <span className="collection__stat__label">
              <Skeleton width="48px" height="16px" />
            </span>
            <span className="collection__stat__data">
              <Skeleton width="90px" height="16px" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  ) : (
    <Link to={link} key={index} className="collection">
      <img
        src={logo || imageLink}
        alt=""
        className="collection__img"
      />
      <div className="collection__info">
        <h3 className="collection__name">{title}</h3>
        <div className="collection__stats">
          <div className="collection__stat">
            <span className="collection__stat__label">Floor</span>
            <span className="collection__stat__data">
              {parseFloat(floor).toFixed(2)} ETH
            </span>
          </div>
          <div className="collection__stat">
            <span className="collection__stat__label">Total Volume</span>
            <span className="collection__stat__data">
              {totalVolume} ETH
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CollectionCard;