import React from "react";
import Skeleton from "../ui/Skeleton";
import PropTypes from 'prop-types';

CollectionInfo.propTypes = {
  skeleton: PropTypes.bool.isRequired,
  collection: PropTypes.shape({
    description: PropTypes.string,
    items: PropTypes.array,
    createdDate: PropTypes.string,
    creatorEarnings: PropTypes.string,
    chain: PropTypes.string,
  })
};

export default function CollectionInfo() {
  return (
    <section id="collection-info">
      <div className="row">
        <div className="collection-info__wrapper">
          <p className="collection-info__description">
            The Meebits are 20,000 unique 3D voxel characters, created by a
            custom generative algorithm, then registered on the Ethereum
            blockchain.
          </p>
          <div className="collection-info__details">
            <span className="collection-info__detail">
              Items
              <span className="collection-info__detail__data"> 20K</span>
            </span>
            ·
            <span className="collection-info__detail">
              Created
              <span className="collection-info__detail__data"> May 2021</span>
            </span>
            ·
            <span className="collection-info__detail">
              Creator earnings
              <span className="collection-info__detail__data"> 1%</span>
            </span>
            ·
            <span className="collection-info__detail">
              Chain
              <span className="collection-info__detail__data"> Ethereum</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}