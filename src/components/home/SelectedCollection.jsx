import React, { useEffect, useState } from "react";
import VerifiedIcon from "../../assets/verified.png";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../ui/Skeleton";
import { useParams } from "react-router-dom";
export default function SelectedCollection() {
  const [selection, setSelection] = useState({});
  const [loading, setLoading] = useState(false);
const {id} = useParams()
  async function fetchData() {
    setLoading(true)
    try {
      const { data } = await axios.get(
        "https://remote-internship-api-production.up.railway.app/selectedCollection"
      );
      setSelection(data.data);
      if (selection === "False") {
   setSelection({})
      }
     
    } catch (error) {
      setSelection(false)
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
     poster={selection.thumbnail}
     src={selection.videoLink}
     className="selected-collection__bg"
   />
   <div className="selected-collection__description">
     <img
       src={selection.logo}
       alt=""
       className="selected-collection__logo"
     />
     <h1 className="selected-collection__title">{selection.title}</h1>
     <Link to={`/user`} className="selected-collection__author">
       By {selection.creator}
       <img
         src={VerifiedIcon}
         className="selected-collection__author__verified"
         alt="Verified"
       />
     </Link>
     <div className="selected-collection__details">
       {selection.amountOfItems} · {selection.floorPrice} ETH
     </div>
     <Link to={`/collection/${selection.collectionId}`} className="selected-collection__button">
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
