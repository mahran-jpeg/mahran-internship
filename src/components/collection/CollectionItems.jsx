import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../ui/Skeleton";

export default function CollectionItems({ skeleton, collection }) {
  const [filter, setFilter] = useState("Default");
  const [filteredNfts, setFilteredNfts] = useState([]);
  const [collectionsLength, setCollectionsLength] = useState(12);

  useEffect(() => {
    if (collection.items?.length > 0) {
      let sortedNfts = [...collection?.items];
      if (filter === "HIGH_TO_LOW") {
        sortedNfts.sort((a, b) => b.price - a.price);
      } else if (filter === "LOW_TO_HIGH") {
        sortedNfts.sort((a, b) => a.price - b.price);
      }
      setFilteredNfts(sortedNfts);
    }
  }, [filter]);

  return (
    <section id="collection-items">
      <div className="row collection-items__row">
        <div className="collection-items__header">
          <div className="collection-items__header__left">
            <span className="collection-items__header__live">
              {skeleton ? (
                <Skeleton width="52px" height="16px" borderRadius={4} />
              ) : (
                <>
                  <div className="green-pulse"></div>
                  {"Live"}
                </>
              )}
            </span>
            <span className="collection-items__header__results">
              {skeleton ? (
                <Skeleton width="72px" height="16px" borderRadius={4} />
              ) : (
                <>{`${collection.items.length} results`}</>
              )}
            </span>
          </div>
          {skeleton ? (
            <Skeleton width="240px" height="48px" borderRadius={16} />
          ) : (
            <>
              <select
                defaultValue={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="collection-items__header__sort"
              >
                <option disabled value="Default" default>
                  Default
                </option>
                <option value="HIGH_TO_LOW">Price high to low</option>
                <option value="LOW_TO_HIGH">Price low to high</option>
              </select>
            </>
          )}
        </div>
        <div className="collection-items__body">
          {skeleton
            ? new Array(collectionsLength).fill(0).map((_, index) => (
                <div className="item-column">
                  <Link to={"/item"} key={index} className="item">
                    <figure className="item__img__wrapper">
                      <Skeleton width="100%" height="100%" borderRadius={4} />
                    </figure>
                    <div className="item__details">
                      <span className="item__details__name">
                        <Skeleton width="80px" height="16px" borderRadius={4} />
                      </span>
                      <span className="item__details__price">
                        <Skeleton width="48px" height="16px" borderRadius={4} />
                      </span>
                      <span className="item__details__last-sale">
                        <Skeleton
                          width="120px"
                          height="16px"
                          borderRadius={4}
                        />
                      </span>
                    </div>
                  </Link>
                </div>
              ))
            : (filteredNfts?.length > 0
                ? filteredNfts.slice(0, collectionsLength)
                : collection.items.slice(0, collectionsLength)
              ).map((nft, index) => (
                <div className="item-column">
                  <Link to={`/item/${nft.itemId}`} key={index} className="item">
                    <figure className="item__img__wrapper">
                      <img src={nft.imageLink} alt="" className="item__img" />
                    </figure>
                    <div className="item__details">
                      <span className="item__details__name">{nft.title}</span>
                      <span className="item__details__price">
                        {nft.price} ETH
                      </span>
                      <span className="item__details__last-sale">
                        Last sale: {nft.lastSale} ETH
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
      {collectionsLength < collection.items?.length && (
        <button
          onClick={() => setCollectionsLength((prev) => prev + 6)}
          className="collection-page__button"
        >
          Load more
        </button>
      )}
    </section>
  );
}
