import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../ui/Skeleton";
import { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function CollectionHeader({ selectedCollection, loading }) {
  const [itemDetails, setItemDetails] = useState({});
  const [userData , setUserData] = useState({})
  const {id} = useParams()
  async function getData() {
  
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
    } 
  }
  async function getUserData(){
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
  useEffect(()=>{
    getData()
  },[])
  return loading ? (
    <header id="collection-header" style={{ height: '300px', position: 'relative' }}>
      <Skeleton width="100%" height="100%" borderRadius="0px" style={{ display: 'block' }} />
    </header>
  ) : (
    <header
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.2)), url(${selectedCollection.imageLink})`,
        height: '300px', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}
      id="collection-header"
    >
      <div className="row collection-header__row">
        <div className="collection-header__content">
          <div className="collection-header__left">
            <img
              src={selectedCollection.logo}
              alt=""
              className="collection-header__img"
            />
            <div className="collection-header__name">
              {selectedCollection.title}
            </div>
            <Link to={`/user/${selectedCollection.creatorId}`}className="collection-header__author">
              {selectedCollection.creator}
            </Link>
          </div>
          <div className="collection-header__right">
            <div className="collection-header__columns">
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">{selectedCollection.totalVolume}</span>{" "}
                  ETH
                </span>
                <span className="collection-header__column__label">
                  Total volume
                </span>
              </div>
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">{selectedCollection.floor}</span>{" "}
                  ETH
                </span>
                <span className="collection-header__column__label">
                  Floor price
                </span>
              </div>
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">{selectedCollection.bestOffer}</span>{" "}
                  ETH
                </span>
                <span className="collection-header__column__label">
                  Best offer
                </span>
              </div>
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">{selectedCollection.listed}%</span>
                </span>
                <span className="collection-header__column__label">Listed</span>
              </div>
              <div className="collection-header__column">
                <span className="collection-header__column__data">
                  <span className="semibold">{selectedCollection.owners}</span>
                </span>
                <span className="collection-header__column__label">
                  Owners (Unique)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
