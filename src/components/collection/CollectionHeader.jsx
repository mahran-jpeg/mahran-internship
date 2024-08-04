import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../ui/Skeleton";
import PropTypes from 'prop-types';

CollectionHeader.propTypes = {
  skeleton: PropTypes.bool.isRequired,
  collection: PropTypes.shape({
    imageLink: PropTypes.string,
    logo: PropTypes.string,
    title: PropTypes.string,
    creatorId: PropTypes.string,
    creator: PropTypes.string,
    totalVolume: PropTypes.string,
    floor: PropTypes.string,
    bestOffer: PropTypes.string,
    listed: PropTypes.number,
    owners: PropTypes.number
  })
};

export default function CollectionHeader() {
  return (
    <header
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.2)), 
        url('https://i.seadn.io/gcs/files/cbeed39f76506b4baf71005d7127d0df.png?auto=format&dpr=1&w=1920')`,
      }}
      id="collection-header"
    >
      <div className="row collection-header__row">
        <div className="collection-header__content">
          <div className="collection-header__left">
            <img
              src="https://i.seadn.io/gcs/files/2d036c8c2bed042a1588622c3173677f.png?auto=format&dpr=1&w=256"
              alt=""
              className="collection-header__img"
            />
            <div className="collection-header__name">Meebits</div>
            <Link to={'/user'} className="collection-header__author">C352B5</Link>
          </div>
          <div className="collection-header__right">
            <div className="collection-header__columns">
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">181,714</span> ETH
                </span>
                <span className="collection-header__column__label">
                  Total volume
                </span>
              </div>
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">0.55</span> ETH
                </span>
                <span className="collection-header__column__label">
                  Floor price
                </span>
              </div>
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">0.5154</span> ETH
                </span>
                <span className="collection-header__column__label">
                  Best offer
                </span>
              </div>
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">1%</span>
                </span>
                <span className="collection-header__column__label">Listed</span>
              </div>
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">6,452 (32%)</span>
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
