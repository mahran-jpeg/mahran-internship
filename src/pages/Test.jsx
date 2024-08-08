const renderSkeletons = () => {
  <div className="item-column">
    <Link to={`/item/${items.itemId}`} key={index} className="item">
      <figure className="item__img__wrapper">
        <Skeleton width="100%" height="100%" borderRadius="4px" />
      </figure>
      <div className="item__details">
        <span className="item__details__name">
          <Skeleton width="100px" height="20px" borderRadius="4px" />
        </span>
        <span className="item__details__price">
          <Skeleton width="100px" height="20px" borderRadius="4px" />
        </span>
        <span className="item__details__last-sale">
          <Skeleton width="100px" height="20px" borderRadius="4px" />
        </span>
      </div>
      <div className="item__see-more">
        <button className="item__see-more__button">See More</button>
        <div className="item__see-more__icon">
          <FontAwesomeIcon icon={faShoppingBag} />
        </div>
      </div>
    </Link>
  </div>;
};
