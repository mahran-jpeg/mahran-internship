import { faShoppingBag, faTableCells } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Skeleton from "../ui/Skeleton";
import { Navigation, Pagination } from "swiper/modules";

export default function RecommendedItems({ itemDetails }) {
  const [swiperKey, setSwiperKey] = useState(0);
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCollection = async () => {
    setLoading(true);
    try {
      const { data: response } = await axios.get(
        `https://remote-internship-api-production.up.railway.app/collection/${itemDetails.collectionId}`
      );
      setCollection(response.data);
      setSwiperKey(swiperKey + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollection();
  }, [itemDetails.collectionId]);

  const renderSkeletons = () => {
    return new Array(8).fill(0).map((_, index) => (
      <div className="item-column" key={index}>
        <SwiperSlide>
          <div className="item">
            <figure className="item__img__wrapper">
              <Skeleton width="100%" height="100%" borderRadius="4px" />
            </figure>
            <div className="item__details">
              <span className="item__details__name">
                <Skeleton width="48px" height="16px" />
              </span>
              <span className="item__details__price">
                <Skeleton width="90px" height="16px" />
              </span>
              <span className="item__details__last-sale">
                <Skeleton width="48px" height="16px" />
              </span>
            </div>
            <div className="item__see-more">
              <button className="item__see-more__button">See More</button>
              <div className="item__see-more__icon">
                <FontAwesomeIcon icon={faShoppingBag} />
              </div>
            </div>
          </div>
        </SwiperSlide>
      </div>
    ));
  };

  return (
    <section id="recommended-items">
      <div className="container">
        <div className="row recommended-items__row">
          <div className="recommended-items__wrapper">
            <div className="recommended-items__header">
              <FontAwesomeIcon icon={faTableCells} />
              <h3 className="recommended-items__header__title">
                More from this collection
              </h3>
            </div>
            <div className="recommended-items__body">
              {loading ? (
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#000",
                    "--swiper-navigation-size": "25px",
                  }}
                  modules={[Navigation, Pagination]}
                  spaceBetween={12}
                  loop
                  navigation
                  slidesPerView={6}
                >
                  {renderSkeletons()}
                </Swiper>
              ) : (
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#000",
                    "--swiper-navigation-size": "25px",
                  }}
                  key={swiperKey}
                  breakpoints={{
                    0: {
                      width: 0,
                      slidesPerView: 1,
                    },
                    368: {
                      width: 368,
                      slidesPerView: 1,
                    },
                    768: {
                      width: 768,
                      slidesPerView: 2,
                    },
                    1024: {
                      width: 992,
                      slidesPerView: 3,
                    },
                    1220: {
                      width: 1220,
                      slidesPerView: 4,
                    },
                    1440: {
                      width: 1440,
                      slidesPerView: 5,
                    },
                  }}
                  modules={[Navigation, Pagination]}
                  spaceBetween={12}
                  loop
                  navigation
                  slidesPerView={6}
                >
                  {collection.items
                    ?.filter((item) => item.itemId !== itemDetails?.id)
                    .slice(0, 30)
                    .map((items, index) => (
                      <div className="item-column" key={index}>
                        <SwiperSlide>
                          <Link
                            to={`/item/${items.itemId}`}
                            className="item"
                          >
                            <figure className="item__img__wrapper">
                              <img
                                src={items.imageLink}
                                alt=""
                                className="item__img"
                              />
                            </figure>
                            <div className="item__details">
                              <span className="item__details__name">
                                {items.title}
                              </span>
                              <span className="item__details__price">
                                {items.price} ETH
                              </span>
                              <span className="item__details__last-sale">
                                Last sale: {items.lastSale} ETH
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
                        </SwiperSlide>
                      </div>
                    ))}
                </Swiper>
              )}
            </div>
            <div className="recommended-items__footer">
              <Link
                to={`/collection/${itemDetails.collectionId}`}
                className="recommended-items__footer__button"
              >
                View Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
