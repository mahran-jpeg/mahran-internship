import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Skeleton from "../components/ui/Skeleton";
import axios from "axios";
export default function UserPage() {
  const [userData, setUserData] = useState({});
  const [userArray, setUserArray] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  async function getUserData() {
    setLoading(true);
    try {
      const { data: response } = await axios.get(
        `https://remote-internship-api-production.up.railway.app/user/${id}`
      );
      setUserData(response.data);
      setUserArray(response.data.items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  function sortItems() {
    if (sort === "HIGH_TO_LOW") {
      setUserArray(userArray.slice().sort((a, b) => b.price - a.price));
    } else if (sort === "LOW_TO_HIGH") {
      setUserArray(userArray.slice().sort((a, b) => a.price - b.price));
    }
  }

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  useEffect(() => {
    getUserData();
  }, []);
  useEffect(() => {
    sortItems();
  }, [sort]);
  const renderSkeletons = () => {
    return (
      <>
        <header
          style={{ backgroundImage: `url(${userData.imageLink})` }}
          id="user-header"
        >
          <Skeleton width="100%" height="100%" borderRadius={0} />
        </header>

        <section id="user-info">
          <div className="row">
            <div className="user-info__wrapper">
              <figure className="user-info__img__wrapper">
                <Skeleton width="100%" height="100%" borderRadius={0} />
              </figure>
              <h1 className="user-info__name">
                <Skeleton width="240px" height="16px"  borderRadius='4px'/>
              </h1>
              <div className="user-info__details">
                <span className="user-info__wallet">
                  <Skeleton width="300px" height="16px" borderRadius='4px' />
                </span>
                <span className="user-info__year">
                  <Skeleton 
                  width="120px" height="16px" borderRadius='4px' marginTop ='30px'/>
                </span>
              </div>
            </div>
          </div>
        </section>
        <section id="user-items">
    <div className="row user-items__row">
      <div className="user-items__header">
        <div className="user-items__header__left">
        <Skeleton width="120px" height="16px" borderRadius='4px' />
        </div>
        <select
              className="user-items__header__sort"
              value={sort}
              onChange={(event) => {
                setSort(event.target.value);
              }}
            >
              <option value="" default selected disabled>
                Recently purchased
              </option>
              <option value="HIGH_TO_LOW">Price high to low</option>
              <option value="LOW_TO_HIGH">Price low to high</option>
            </select>
      </div>
      <div className="user-items__body">
        {Array(12)
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
              <div className="item__see-more" href="#">
              <Skeleton width="150px" height="30px" borderRadius="4px" />
              </div>
        
          </div>
        ))}
      </div>
    </div>
    {visibleCount < userArray.length && (
      <button className="collections-page__button" onClick={loadMore}>
        Load more
      </button>
    )}
  </section>
      </>
    );
  };
  return loading ? ( 
    renderSkeletons()
    ): (
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
            <h1 className="user-info__name">{userData.name}</h1>
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
              <span className="user-items__header__text">
                {userArray.length} items
              </span>
            </div>
            <select
              className="user-items__header__sort"
              value={sort}
              onChange={(event) => {
                setSort(event.target.value);
              }}
            >
              <option value="" default selected disabled>
                Recently purchased
              </option>
              <option value="HIGH_TO_LOW">Price high to low</option>
              <option value="LOW_TO_HIGH">Price low to high</option>
            </select>
          </div>
          <div className="user-items__body">
            {userArray.slice(0, visibleCount).map((user, index) => (
              <div className="item-column" key={index}>
                <Link to={`/item/${user.itemId}`} className="item">
                  <figure className="item__img__wrapper">
                    <img src={user.imageLink} alt="" className="item__img" />
                  </figure>
                  <div className="item__details">
                    <span className="item__details__name">{user.title}</span>
                    <span className="item__details__price">
                      {user.price} ETH
                    </span>
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
        {visibleCount < userArray.length && (
          <button className="collections-page__button" onClick={loadMore}>
            Load more
          </button>
        )}
      </section>
    </>
    );
}
