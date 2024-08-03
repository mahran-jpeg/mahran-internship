import React, { useEffect, useState } from "react";
import VerifiedIcon from "../../assets/verified.png";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../ui/Skeleton";
export default function SelectedCollection() {
  const [nftData, setNftData] = useState({});
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true)
    try {
      const { data } = await axios.get(
        "https://remote-internship-api-production.up.railway.app/selectedCollection"
      );
      setNftData(data.data);
      if (nftData === "False") {
   setNftData({})
      }
     
    } catch (error) {
      setNftData(false)
      console.error("Error fetching data:", error);
    } finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <header>
     
   <div className="selected-collection">
    { loading ? (
          <Skeleton width="100%" height="100%" border-radius="0px" />
    ):(
      <>
       <video
     autoPlay
     muted
     loop
     playsInline
     poster={nftData.thumbnail}
     src={nftData.videoLink}
     className="selected-collection__bg"
   />
   <div className="selected-collection__description">
     <img
       src={nftData.logo}
       alt=""
       className="selected-collection__logo"
     />
     <h1 className="selected-collection__title">{nftData.title}</h1>
     <Link to={`/user`} className="selected-collection__author">
       By {nftData.creator}
       <img
         src={VerifiedIcon}
         className="selected-collection__author__verified"
         alt="Verified"
       />
     </Link>
     <div className="selected-collection__details">
       {nftData.amountOfItems} · {nftData.floorPrice} ETH
     </div>
     <Link to={`/collection/`} className="selected-collection__button">
       <div className="green-pulse"></div>
       View Collection
     </Link>
   </div>
      </>
)}
 </div>


   
    </header>
  );
}
