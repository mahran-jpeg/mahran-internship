import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
export default function UserPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  const [userData , setUserData] = useState({})
const[userArray , setUserArray] = useState([])
  async function getUserData() {
    try {
      const { data: response } = await axios.get(
        `https://remote-internship-api-production.up.railway.app/user/${id}`
      );
      setUserData(response.data);
      setUserArray(response.data.items)
    } catch (error) {
      console.error(error);
    }
  }

 useEffect(()=>{
getUserData()
 },[])
  return (
    <>
      <header
        style={{
          backgroundImage: `url(${userData.imageLink})`,
        }}
        id="user-header"
      ></header>

      <section id="user-info">
        <div className="row">
          <div className="user-info__wrapper">
            <figure className="user-info__img__wrapper">
              <img
                src={userData.profilePicture}
                alt=""
                className="user-info__img"
              />
            </figure>
            <h1 className="user-info__name">
              {userData.name}
            </h1>
            <div className="user-info__details">
              <span className="user-info__wallet">
                <FontAwesomeIcon
                  icon={faEthereum}
                  className="user-info__wallet__icon"
                />
                <span className="user-info__wallet__data">
                {userData.walletCode}
                </span>
              </span>
              <span className="user-info__year">
                <span className="user-info__year__data">
                  Joined {userData.creationDate}
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="user-items">
        <div className="row user-items__row">
          <div className="user-items__header">
            <div className="user-items__header__left">
              <span className="user-items__header__text">163 items</span>
            </div>
            <select className="user-items__header__sort">
              <option value="">Recently purchased</option>
              <option value="">Price high to low</option>
              <option value="">Price low to high</option>
            </select>
          </div>
          <div className="user-items__body">
            {userArray.slice(0,10).map((user, index) => (
              <div className="item-column" key={index}>
                <Link to={`/item/${user.itemId}`} className="item">
                  <figure className="item__img__wrapper">
                    <img
                      src={user.imageLink}
                      alt=""
                      className="item__img"
                    />
                  </figure>
                  <div className="item__details">
                    <span className="item__details__name">
                  {user.title}</span>
                    <span className="item__details__price">
                      {user.price} ETH</span>
                    <span className="item__details__last-sale">
                      Last sale: {user.lastSale}ETH
                    </span>
                  </div>
                  <a className="item__see-more" href="#">
                    <button className="item__see-more__button">See More</button>
                    <div className="item__see-more__icon">
                      <FontAwesomeIcon icon={faShoppingBag} />
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <button className="collection-page__button">Load more</button>
      </section>
    </>
  );
}
