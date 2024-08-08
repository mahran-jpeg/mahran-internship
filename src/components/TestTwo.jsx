const renderSkeletons = () => {
  return (
    new Array(8).fill(0).map((_, index) => (
      <div className="item-column" key={index}>
        <SwiperSlide>
          <div className="item">
            <figure className="item__img__wrapper">
              {loading ? (
                <Skeleton width="100%" height="100%" borderRadius="4px" />
              ) : (
                <img className="item__img" />
              )}
            </figure>
            <div className="item__details">
              <span className="item__details__name">
                <Skeleton width="48px" height="16px" />
              </span>
              <span className="item__details__price">
                <Skeleton width="90px" height="16px" />
              </span>
              <span className="item__details__last-sale">
                <Skeleton width="48px" height="16px" />
              </span>
            </div>
            <div className="item__see-more">
              <button className="item__see-more__button">See More</button>
              <div className="item__see-more__icon">
                <FontAwesomeIcon icon={faShoppingBag} />
              </div>
            </div>
          </div>
        </SwiperSlide>
      </div>
    ))
  );
};