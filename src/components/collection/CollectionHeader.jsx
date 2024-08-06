import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../ui/Skeleton";

export default function CollectionHeader({ selectedCollection, loading }) {
  return loading ? (
    <header id="collection-header" style={{ height: '300px', position: 'relative' }}>
      <Skeleton width="100%" height="100%" borderRadius="0px" style={{ display: 'block' }} />
    </header>
  ) : (
    <header
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.2)), url(${selectedCollection.imageLink})`,
        height: '300px', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}
      id="collection-header"
    >
      <div className="row collection-header__row">
        <div className="collection-header__content">
          <div className="collection-header__left">
            <img
              src={selectedCollection.logo}
              alt=""
              className="collection-header__img"
            />
            <div className="collection-header__name">
              {selectedCollection.title}
            </div>
            <Link to="/user" className="collection-header__author">
              {selectedCollection.creator}
            </Link>
          </div>
          <div className="collection-header__right">
            <div className="collection-header__columns">
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">{selectedCollection.totalVolume}</span>{" "}
                  ETH
                </span>
                <span className="collection-header__column__label">
                  Total volume
                </span>
              </div>
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">{selectedCollection.floor}</span>{" "}
                  ETH
                </span>
                <span className="collection-header__column__label">
                  Floor price
                </span>
              </div>
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">{selectedCollection.bestOffer}</span>{" "}
                  ETH
                </span>
                <span className="collection-header__column__label">
                  Best offer
                </span>
              </div>
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">{selectedCollection.listed}%</span>
                </span>
                <span className="collection-header__column__label">Listed</span>
              </div>
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">{selectedCollection.owners}</span>
                </span>
                <span className="collection-header__column__label">
                  Owners (Unique)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
