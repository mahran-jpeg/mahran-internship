
import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faShapes,
  faTag,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import RecommendedItems from "../components/item/RecommendedItems";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/ui/Skeleton";
export default function ItemPage() {
  const { id } = useParams();
  const { collectionId } = useParams();
  const [itemDetails, setItemDetails] = useState({});
  const [recommendedItems, setRecomendedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [timeLeft, setTimeLeft] = useState('');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = itemDetails.expiryDate - now;

      if (difference > 0) {
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft('Expired');
      }
    };

    if (itemDetails.expiryDate) {
      calculateTimeLeft();
      const timer = setInterval(calculateTimeLeft, 1000);
      return () => clearInterval(timer);
    }
  }, [itemDetails.expiryDate]);
  async function getData() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://remote-internship-api-production.up.railway.app/item/${id}`
      );
      if (data === "False") {
        setItemDetails([]);
      } else {
        setItemDetails(data.data);
      }
    } catch (error) {
      setItemDetails({});
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchData() {
    try {
      const { data } = await axios.get(
        `https://remote-internship-api-production.up.railway.app/item/${collectionId}`
      );
      if (data === "False") {
        setRecomendedItems([]);
      } else {
        setRecomendedItems(data.data);
      }
    } catch (error) {
      setItemDetails({});
      console.error("Error fetching data:", error);
    }
  }
  async function getUserData() {
    try {
      const { data } = await axios.get(
        `https://remote-internship-api-production.up.railway.app/user/${id}`
      );
      if (data === "False") {
        setUserData([]);
      } else {
        setUserData(data.data);
      }
    } catch (error) {
      setUserData({});
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    getData();
  }, [id]);
  const renderSkeletons = () => {
    return (
      <div className="row item-page__row">
        <div className="item-page__left">
          <figure className="item-page__img__wrapper">
            <div className="item-page__img__details">
              <FontAwesomeIcon
                icon={faEthereum}
                className="item-page__img__icon"
              />
              <div className="item-page__img__likes">
                <Skeleton width="40px" height="16px" borderRadius="4px" />
              </div>
            </div>
            {loading ? (
              <Skeleton width="100%" height="100%" borderRadius="4px" />
            ) : (
              <img
                src={itemDetails.imageLink}
                alt="Item"
                className="item-page__img"
              />
            )}
          </figure>
        </div>
        <div className="item-page__right">
          <div className="item-page__collection light-blue">
            <Skeleton width="150px" height="18px" borderRadius="4px" />
          </div>
          <h1 className="item-page__name">
            <Skeleton width="200px" height="18px" borderRadius="4px" />
          </h1>
          <span className="item-page__owner">
            <Skeleton width="140px" height="18px" borderRadius="4px" />
          </span>
          <div className="item-page__details">
            <div className="item-page__detail">
              <span className="item-page__detail__text">
                <Skeleton width="90px" height="16px" borderRadius="4px" />
              </span>
            </div>
            <div className="item-page__detail">
              <span className="item-page__detail__text">
                <Skeleton width="90px" height="16px" borderRadius="4px" />
              </span>
            </div>
            <div className="item-page__detail">
              <span className="item-page__detail__text">
                <Skeleton width="90px" height="16px" borderRadius="4px" />
              </span>
            </div>
          </div>
          <div className="item-page__sale">
            <div className="item-page__sale__header">
              <span>
                <Skeleton width="250px" height="18px" borderRadius="4px" />
              </span>
            </div>
            <div className="item-page__sale__body">
              <span className="item-page__sale__label">
                <Skeleton width="100px" height="14px" borderRadius="4px" />
              </span>{" "}
              <div className="item-page__sale__price">
                <Skeleton width="210px" height="20px" borderRadius="4px" />
              </div>
              <div className="item-page__sale__buttons">
                <Skeleton width="100%" height="40px" borderRadius="4px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <section id="item-info">
        <div className="container">
          <div className="row item-page__row">
            {loading ? (
              renderSkeletons()
            ) : (
              <>
                <div className="item-page__left">
                  <figure className="item-page__img__wrapper">
                    <div className="item-page__img__details">
                      <FontAwesomeIcon
                        icon={faEthereum}
                        className="item-page__img__icon"
                      />
                      <div className="item-page__img__likes">
                        <FontAwesomeIcon
                          icon={faHeart}
                          className="item-page__img__icon"
                        />
                        <span className="item-page__img__likes__text">
                          {itemDetails.favorites}
                        </span>
                      </div>
                    </div>
                    <img
                      src={itemDetails.imageLink}
                      className="item-page__img"
                      alt="Item"
                    />
                  </figure>
                </div>
                <div className="item-page__right">
                  <Link
                    to={`/collection/${itemDetails.collectionId}`}
                    className="item-page__collection light-blue"
                  >
                    {itemDetails.collection}
                  </Link>
                  <h1 className="item-page__name">{itemDetails.title}</h1>
                  <span className="item-page__owner">
                    Owned by{" "}
                    <Link
                      to={`/user/${itemDetails.ownerId}`}
                      className="light-blue item-page__owner__link"
                    >
                      {itemDetails.owner}
                    </Link>
                  </span>
                  <div className="item-page__details">
                    <div className="item-page__detail">
                      <FontAwesomeIcon
                        icon={faEye}
                        className="item-page__detail__icon"
                      />
                      <span className="item-page__detail__text">
                        {itemDetails.views} views
                      </span>
                    </div>
                    <div className="item-page__detail">
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="item-page__detail__icon"
                      />
                      <span className="item-page__detail__text">
                        {itemDetails.favorites} favorites
                      </span>
                    </div>
                    <div className="item-page__detail">
                      <FontAwesomeIcon
                        icon={faShapes}
                        className="item-page__detail__icon"
                      />
                      <span className="item-page__detail__text">
                        {itemDetails.category}
                      </span>
                    </div>
                  </div>
                  <div className="item-page__sale">
                    <div className="item-page__sale__header">
                      <div className="green-pulse"></div>
                      <span>Sale ends in {timeLeft}</span>
                    </div>
                    <div className="item-page__sale__body">
                      <span className="item-page__sale__label">
                        Current price
                      </span>
                      <div className="item-page__sale__price">
                        <span className="item-page__sale__price__eth">
                          {itemDetails.ethPrice} ETH
                        </span>
                        <span className="item-page__sale__price__dollars">
                          {itemDetails.usdPrice}
                        </span>
                      </div>
                      <div className="item-page__sale__buttons">
                        <div className="item-page__sale__buy">
                          <button className="item-page__sale__buy__button disabled">
                            Buy now
                          </button>
                          <button className="item-page__sale__buy__icon disabled">
                            <FontAwesomeIcon icon={faShoppingBag} />
                          </button>
                        </div>
                        <button className="item-page__sale__offer disabled">
                          <FontAwesomeIcon icon={faTag} />
                          Make offer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <RecommendedItems itemDetails={itemDetails} />
    </>
  );
}

