import React from "react";
import Skeleton from "../ui/Skeleton";

export default function CollectionInfo({ skeleton, collection }) {
  return (
    <section id="collection-info">
      <div className="row">
        <div className="collection-info__wrapper">
          {skeleton ? (
            <p className="collection-info__description">
              <Skeleton width="620px" height="16px" borderRadius={4} />
              <Skeleton width="620px" height="16px" borderRadius={4} />
              <Skeleton width="434px" height="16px" borderRadius={4} />
            </p>
          ) : (
            <p className="collection-info__description">
              {collection.description}
            </p>
          )}

          <div className="collection-info__details">
            {skeleton ? (
              <Skeleton width="58px" height="16px" borderRadius={4} />
            ) : (
              <span className="collection-info__detail">
                Items
                <span className="collection-info__detail__data">
                  {" "}
                  {collection?.items.length}
                </span>
              </span>
            )}
            {skeleton ? (
              <Skeleton width="120px" height="16px" borderRadius={4} />
            ) : (
              <>
                {"·"}
                <span className="collection-info__detail">
                  Created
                  <span className="collection-info__detail__data">
                    {" "}
                    {collection?.createdDate}
                  </span>
                </span>
              </>
            )}
            {skeleton ? (
              <Skeleton width="132px" height="16px" borderRadius={4} />
            ) : (
              <>
                {"·"}
                <span className="collection-info__detail">
                  Creator earnings
                  <span className="collection-info__detail__data">
                    {" "}
                    {collection?.creatorEarnings}%
                  </span>
                </span>
              </>
            )}
            {skeleton ? (
              <Skeleton width="108px" height="16px" borderRadius={4} />
            ) : (
              <>
                {"·"}
                <span className="collection-info__detail">
                  Chain
                  <span className="collection-info__detail__data">
                    {" "}
                    {collection?.chain}
                  </span>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
