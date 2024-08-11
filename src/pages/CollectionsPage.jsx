import React, { useEffect, useState } from "react";
import Skeleton from "../../src/components/ui/Skeleton";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import CollectionCard from "../components/collection/Card";
export default function CollectionsPage() {
  const [collectionsPage, setCollectionsPage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://remote-internship-api-production.up.railway.app/collections"
      );
      if (data === "False") {
        setCollectionsPage([]);
      } else {
        setCollectionsPage(data.data);
      }
    } catch (error) {
      setCollectionsPage([]);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  const renderSkeletons = () => {
    return Array(12)
      .fill(0)
      .map((_, index) => (
        <div className="collection-column" key={index}>
          <div className="collection__img">
            <Skeleton width="100%" height="100%" borderRadius="4px" />
          </div>
          <div className="collection__info">
            <h3 className="collection__name">
              <Skeleton width="150px" height="20px" borderRadius="4px" />
            </h3>
            <div className="collection__stats">
              <div className="collection__stat">
                <span className="collection__stat__label">
                  <Skeleton width="40px" height="20px" borderRadius="4px" />
                </span>
                <span className="collection__stat__data">
                  <Skeleton width="70px" height="18px" borderRadius="4px" />
                </span>
              </div>
              <div className="collection__stat">
                <span className="collection__stat__label">
                  <Skeleton width="86px" height="20px" borderRadius="4px" />
                </span>
                <span className="collection__stat__data">
                  <Skeleton width="70px" height="18px" borderRadius="4px" />
                </span>
              </div>
            </div>
          </div>
        </div>
      ));
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="collections-page__title">Collections</h1>
        <div className="collections__body">
          {loading
            ? renderSkeletons()
            : collectionsPage
                .slice(0, visibleCount)
                .map((collection, index) => (
                  <div className="collection-column" key={index}>
                    <Link
                      to={`/collection/${collection.id}`}
                      className="collection"
                    >
                      <div className="collections-page__image--wrapper">
                        <img
                          src={collection.imageLink}
                          alt={collection.title}
                          className="collection__img"
                        />
                      </div>
                      <div className="collection__info">
                        <h3 className="collection__name">{collection.title}</h3>
                        <div className="collection__stats">
                          <div className="collection__stat">
                            <span className="collection__stat__label">
                              Floor
                            </span>
                            <span className="collection__stat__data">
                              {Math.round(Number(collection.floor) * 100) / 100}{" "}
                              ETH
                            </span>
                          </div>
                          <div className="collection__stat">
                            <span className="collection__stat__label">
                              Total Volume
                            </span>
                            <span className="collection__stat__data">
                              {collection.totalVolume} ETH
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
        </div>
        {visibleCount < collectionsPage.length && (
          <button className="collections-page__button" onClick={loadMore}>
            Load more
          </button>
        )}
      </div>
    </div>
  );
}
