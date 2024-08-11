import VerifiedIcon from "../../assets/verified.png";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Skeleton from'../ui/Skeleton'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();
export default function Trending() {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://remote-internship-api-production.up.railway.app/trendingNFTs"
      );
      if (data === "False") {
        setTrending([]);
      } else {
        setTrending(data.data);
      }
    } catch (error) {
      setTrending([]);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const renderSkeletons = () => {
    return Array(5).fill(0).map((_, index) => (
      <div className="trending-collection" key={index}>
        <div className="trending-collection__rank">
          <Skeleton
            width="26px"
            height="26px"
            borderRadius="4px"
          />
        </div>
        <div className="trending-collection__collection">
          <figure className="trending-collection__img__wrapper">
            <Skeleton  
               width="100%"
               height="100%"
               borderRadius="4px"
            />
          </figure>
          <div className="trending-collection__name">
            <Skeleton
              width="150px"
              height="20px"
              borderRadius="4px"
            />
          </div>
        </div>
        <div className="trending-collection__price">
          <Skeleton 
                width="70px"
                height="18px"
                borderRadius="4px"
          />
        </div>
        <div className="trending-collection__volume">
          <Skeleton 
              width="70px"
              height="18px"
              borderRadius="4px"
           />
        </div>
      </div>
    ));
  };

  return (
    <section id="trending" data-aos="fade-up">
      <div className="container">
        <div className="row trending__row">
          <div className="trending__header">
            <h2 className="trending__header__title">Trending NFTs</h2>
            <Link className="trending__header__button" to="/collections">
              View All
            </Link>
          </div>
          <div className="trending__body">
            <div className="trending-column">
              <div className="trending-column__header">
                <div className="trending-column__header__rank">#</div>
                <div className="trending-column__header__collection">
                  Collection
                </div>
                <div className="trending-column__header__price">Floor Price</div>
                <div className="trending-column__header__price">Volume</div>
              </div>
              <div className="trending-column__body">
                {loading ? renderSkeletons() : trending.slice(0, 5).map((trend, index) => (
                  <Link
                    to="/collection"
                    key={index}
                    className="trending-collection"
                  >
                    <div className="trending-collection__rank">{trend.rank}</div>
                    <div className="trending-collection__collection">
                      <figure className="trending-collection__img__wrapper">
                        <img
                          src={trend.imageLink}
                          alt=""
                          className="trending-collection__img"
                        />
                      </figure>
                      <div className="trending-collection__name">
                        {trend.title}
                      </div>
                      <img
                        src={VerifiedIcon}
                        className="trending-collection__verified"
                      />
                    </div>
                    <div className="trending-collection__price">
                      <span className="trending-collection__price__span">
                        {Math.round(Number(trending.floor) * 100) / 100} ETH
                      </span>
                    </div>
                    <div className="trending-collection__volume">
                      <span className="trending-collection__volume__span">
                        {trending.totalVolume} ETH
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="trending-column">
              <div className="trending-column__header trending-column__header2">
                <div className="trending-column__header__rank">#</div>
                <div className="trending-column__header__collection">
                  Collection
                </div>
                <div className="trending-column__header__price">Floor Price</div>
                <div className="trending-column__header__price">Volume</div>
              </div>
              <div className="trending-column__body">
                {loading ? renderSkeletons() : trending.slice(5, 10).map((trend, index) => (
                  <Link
                    to="/collection"
                    key={index + 5}
                    className="trending-collection"
                  >
                    <div className="trending-collection__rank">{trend.rank}</div>
                    <div className="trending-collection__collection">
                      <figure className="trending-collection__img__wrapper">
                        <img
                          src={trend.imageLink}
                          alt=""
                          className="trending-collection__img"
                        />
                      </figure>
                      <div className="trending-collection__name">
                        {trend.title}
                      </div>
                      <img
                        src={VerifiedIcon}
                        className="trending-collection__verified"
                      />
                    </div>
                    <div className="trending-collection__price">
                      <span className="trending-collection__price__span">
                        {Math.round(Number(trend.floor) * 100) / 100} ETH
                      </span>
                    </div>
                    <div className="trending-collection__volume">
                      <span className="trending-collection__volume__span">
                        {trend.totalVolume} ETH
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

