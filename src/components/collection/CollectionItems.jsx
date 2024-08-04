import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../ui/Skeleton";
import PropTypes from 'prop-types';

CollectionItems.propTypes = {
  skeleton: PropTypes.bool.isRequired,
  collection: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      itemId: PropTypes.string,
      imageLink: PropTypes.string,
      title: PropTypes.string,
      price: PropTypes.number,
      lastSale: PropTypes.number,
    })),
  }),
};

export default function CollectionItems() {
  return (
    <section id="collection-items">
      <div className="row collection-items__row">
        <div className="collection-items__header">
          <div className="collection-items__header__left">
            <span className="collection-items__header__live">
              <div className="green-pulse"></div>
              Live
            </span>
            <span className="collection-items__header__results">
              10 results
            </span>
          </div>
          <select className="collection-items__header__sort">
            <option value="" default>
              Default
            </option>
            <option value="">Price high to low</option>
            <option value="">Price low to high</option>
          </select>
        </div>
        <div className="collection-items__body">
          {new Array(8).fill(0).map((_, index) => (
            <div className="item-column">
              <Link to={"/item"} key={index} className="item">
                <figure className="item__img__wrapper">
                  <img
                    src="https://i.seadn.io/gcs/files/0a085499e0f3800321618af356c5d36b.png?auto=format&dpr=1&w=384"
                    alt=""
                    className="item__img"
                  />
                </figure>
                <div className="item__details">
                  <span className="item__details__name">Meebit #0001</span>
                  <span className="item__details__price">0.98 ETH</span>
                  <span className="item__details__last-sale">
                    Last sale: 7.45 ETH
                  </span>
                </div>
                <div className="item__see-more">
                  <button className="item__see-more__button">See More</button>
                  <div className="item__see-more__icon">
                    <FontAwesomeIcon icon={faShoppingBag} />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <button className="collection-page__button">Load more</button>
    </section>
  );
}
