import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faShapes,
  faTag,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect,useState } from "react";
import RecommendedItems from "../components/item/RecommendedItems";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function ItemPage() {
  const { id } = useParams();
  const {collectionId} = useParams();
  const [itemDetails , setItemDetails] = useState({});
  const [recommendedItems, setRecomendedItems] = useState([])
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function getData() {
    try {
      const  {data}  = await axios.get(
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
    }
  }

  async function fetchData() {
    try {
      const  {data}  = await axios.get(
        `https://remote-internship-api-production.up.railway.app/item/${collectionId}`
      );
      if (data === "False") {
        setRecomendedItems([]);
      } else {
       setRecomendedItems(data.data)
      }
    } catch (error) {
      setItemDetails({});
      console.error("Error fetching data:", error);
    }
  } 
  useEffect(()=>{
    getData()
  },[id])
  

  return (
    <>
      <section id="item-info">
        <div className="container">
          <div className="row item-page__row">
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
                    <span className="item-page__img__likes__text">{itemDetails.favorites}</span>
                  </div>
                </div>
                <img
                  src={itemDetails.imageLink}
                  className="item-page__img"
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
              <h1 className="item-page__name"> {itemDetails.collection} {itemDetails.title}</h1>
              <span className="item-page__owner">
                Owned by{" "}
                <Link
                  to={"/user"}
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
                  <span className="item-page__detail__text">{itemDetails.views} views</span>
                </div>
                <div className="item-page__detail">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="item-page__detail__icon"
                  />
                  <span className="item-page__detail__text">{itemDetails.favorites} favorites</span>
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
                  <span>Sale ends in 2h 30m 56s</span>
                </div>
                <div className="item-page__sale__body">
                  <span className="item-page__sale__label">Current price</span>
                  <div className="item-page__sale__price">
                    <span className="item-page__sale__price__eth">{itemDetails.ethPrice} ETH</span>
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
          </div>
        </div>
      </section>

      <RecommendedItems itemDetails ={itemDetails}/>
    </>
  );
}
