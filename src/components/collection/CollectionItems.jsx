
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../ui/Skeleton";
import PropTypes from "prop-types";



export default function CollectionItems({
  selectedItems,
  loading,
  setSelectedItems,
}) {
  const [visibleCount, setVisibleCount] = useState(11);
  const [sort, setSort] = useState("");

  function sortItems() {
    if (sort === "HIGH_TO_LOW") {
      setSelectedItems(selectedItems.slice().sort((a, b) => b.price - a.price));
    } else if (sort === "LOW_TO_HIGH") {
      setSelectedItems(selectedItems.slice().sort((a, b) => a.price - b.price));
    }
  }
  
  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };
  const renderSkeletons = () => {
    return Array(12)
      .fill(0)
      .map((_, index) => (
        <div className="item-column" key={index}>
          <figure className="item__img__wrapper">
            <Skeleton width="100%" height="100%" borderRadius="4px" />
          </figure>
          <div className="item__details">
            <span className="item__details__name">
              <Skeleton width="120px" height="20px" borderRadius="4px" />
            </span>
            <span className="item__details__price">
              <Skeleton width="50px" height="20px" borderRadius="4px" />
            </span>
            <span className="item__details__last-sale">
              <Skeleton width="150px" height="20px" borderRadius="4px" />
            </span>
          </div>
          <div className="item__see-more">
            <Skeleton width="150px" height="30px" borderRadius="4px" />
          </div>
        </div>


      ));
  };
  useEffect(() => {
    sortItems();
  }, [sort]);
  return (
    <section id="collection-items">
      <div className="row collection-items__row">
        <div className="collection-items__header">
          <div className="collection-items__header__left">
            {loading ? (
              <Skeleton width="120px" height="16px" borderRadius="4px" />
            ) : (
              <span className="collection-items__header__live">
                <div className="green-pulse"></div>
                Live
              </span>
            )}

            {loading ? (
              <Skeleton width="120px" height="16px" borderRadius="4px" />
            ) : (
              <span className="collection-items__header__results">
                {selectedItems.length} results
              </span>
            )}
          </div>
          <select
            value={sort}
            className="collection-items__header__sort"
            onChange={(event) => {
              setSort(event.target.value);
            }}
          >
            <option value="" default selected disabled>
              Default
            </option>
            <option value="HIGH_TO_LOW">Price high to low</option>
            <option value="LOW_TO_HIGH">Price low to high</option>
          </select>
        </div>
        <div className="collection-items__body">
          <div className="collection-items__body">
            {loading
              ? renderSkeletons()
              : selectedItems.slice(0, visibleCount).map((item) => (
                  <div className="item-column" key={item.itemId}>
                    <Link to={`/item/${item.itemId}`} className="item">
                      <figure className="item__img__wrapper">
                        <img
                          src={item.imageLink}
                          alt={item.title}
                          className="item__img"
                        />
                      </figure>
                      <div className="item__details">
                        <span className="item__details__name">
                          {item.title}
                        </span>
                        <span className="item__details__price">
                          {item.price} ETH
                        </span>
                        <span className="item__details__last-sale">
                          Last sale: {item.lastSale} ETH
                        </span>
                      </div>
                      <div className="item__see-more">
                        <button className="item__see-more__button">
                          See More
                        </button>
                        <div className="item__see-more__icon">
                          <FontAwesomeIcon icon={faShoppingBag} />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
          </div>
        </div>
      </div>
      {visibleCount < selectedItems.length && (
        <button className="collections-page__button" onClick={loadMore}>
          Load more
        </button>
      )}
    </section>
  );
}
CollectionItems.defaultProps = {
  selectedCollection: [],
};

CollectionItems.propTypes = {
  selectedCollection: PropTypes.array,
};
CollectionItems.propTypes = {
  selectedItems: PropTypes.array.isRequired,
  setSelectedItems: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

CollectionItems.defaultProps = {
  selectedItems: [],
  setSelectedItems: () => {},
  loading: false,
};
