import React from "react";
import Skeleton from "../ui/Skeleton";
import PropTypes from 'prop-types';

export default function CollectionInfo({selectedCollection,loading}) {
  const renderSkeletons = () => {
    return  (
      <div id="collection-info">
      <div className="row">
        <div className="collection-info__wrapper">
          <p className="collection-info__description">
            <Skeleton width="500px" height="100px" borderRadius="4px" />
          </p>
          <div className="collection-info__details">
            <div className="collection-info__detail-row">
              <span className="collection-info__detail">
                <Skeleton width="100px" height="20px" borderRadius="4px" />
                <span className="collection-info__detail__data">
                  {/* <Skeleton width="100px" height="20px" borderRadius="4px" /> */}
                </span>
              </span>
              {' '}
              <span className="collection-info__detail">
                <Skeleton width="100px" height="20px" borderRadius="4px" />
                <span className="collection-info__detail__data">
                  {/* <Skeleton width="100px" height="20px" borderRadius="4px" /> */}
                </span>
              </span>
              {' '}
              <span className="collection-info__detail">
                <Skeleton width="100px" height="20px" borderRadius="4px" />
                <span className="collection-info__detail__data">
                  {/* <Skeleton width="100px" height="20px" borderRadius="4px" /> */}
                </span>
              </span>
              {' '}
              <span className="collection-info__detail">
                <Skeleton width="100px" height="20px" borderRadius="4px" />
                <span className="collection-info__detail__data">
                  {/* <Skeleton width="100px" height="20px" borderRadius="4px" /> */}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  };
  return (
    <section id="collection-info">
      { loading ? renderSkeletons():
         <div className="row">
         <div className="collection-info__wrapper">
           <p className="collection-info__description">
          {selectedCollection.description}
           </p>
           <div className="collection-info__details">
             <span className="collection-info__detail">
               Items
               <span className="collection-info__detail__data">
               {" "}
              30
               </span>
             </span>
             ·
             <span className="collection-info__detail">
               Created
               <span className="collection-info__detail__data">
                {' '}
               {selectedCollection.createdDate}
               </span>
             </span>
             ·
             <span className="collection-info__detail">
               Creator earnings
               <span className="collection-info__detail__data"> {selectedCollection.creatorEarnings}%</span>
             </span>
             ·
             <span className="collection-info__detail">
               Chain
               <span className="collection-info__detail__data"> 
                 {' '}
               {selectedCollection.chain}
               </span>
             </span>
           </div>
         </div>
       </div>
      }
     
    </section>
  );
}