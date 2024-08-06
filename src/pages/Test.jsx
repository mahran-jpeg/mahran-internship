const renderSkeletons = () => {
  return Array(12)
    .fill(0)
    .map((_, index) => (

      <div className="row collection-items__row">
            <div className="collection-items__header">
          <div className="collection-items__header__left">
            <span className="collection-items__header__live">
            <Skeleton width="50px" height="20px" borderRadius="4px" />
            </span>
            <span className="collection-items__header__results">
            <Skeleton width="50px" height="20px" borderRadius="4px" />
            </span>
          </div>
          <select className="collection-items__header__sort">
          <Skeleton width="50px" height="20px" borderRadius="4px" />
          </select>
        </div>
        <div className="item-column" key={index}>
        <figure className="item__img__wrapper">
          <Skeleton width="100%" height="100%" borderRadius="4px" />
        </figure>
        <div className="item__details">
          <span className="item__details__name">
            <Skeleton width="70px" height="18px" borderRadius="4px" />
          </span>
          <span className="item__details__price">
            <Skeleton width="70px" height="18px" borderRadius="4px" />
          </span>
          <span className="item__details__last-sale">
            <Skeleton width="70px" height="18px" borderRadius="4px" />
          </span>
        </div>
        <div className="item__see-more">
          <Skeleton width="70px" height="18px" borderRadius="4px" />
        </div>
      </div>
      </div>
    ));
};