import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination } from "swiper/modules";
import Skeleton from "../ui/Skeleton";
import Card from "../collection/Card";

export default function PopularCollections() {
  const [popularCollection, setPopularCollection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [swiperKey, setSwiperKey] = useState(0);

  async function fetchData() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://remote-internship-api-production.up.railway.app/popularCollections"
      );
      if (data === "False") {
        setPopularCollection([]);
      } else {
        setPopularCollection(data.data);
        setSwiperKey(swiperKey + 1);
      }
    } catch (error) {
      setPopularCollection([]);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section id="popular-collections">
      <div className="container">
        <div className="row">
          <h2 className="popular-collections__title">Popular Collections</h2>
          <Swiper
            style={{
              "--swiper-navigation-color": "#000",
              "--swiper-navigation-size": "25px",
            }}
            key={swiperKey}
            breakpoints={{
              0: {
                width: 0,
                slidesPerView: 1,
              },
              368: {
                width: 368,
                slidesPerView: 1,
              },
              768: {
                width: 768,
                slidesPerView: 2,
              },
              1024: {
                width: 992,
                slidesPerView: 3,
              },
              1220: {
                width: 1220,
                slidesPerView: 4,
              },
              1440: {
                width: 1440,
                slidesPerView: 5,
              },
            }}
            modules={[Navigation, Pagination]}
            spaceBetween={12}
            loop
            navigation
            slidesPerView={6}
          >
            <div className="popular-collections__body">
              {loading
                ? new Array(8).fill(0).map((_, index) => (
                    <SwiperSlide key={index}>
                      <Card loading={true} />
                    </SwiperSlide>
                  ))
                : popularCollection.slice(0, 10).map((nft, index) => (
                    <SwiperSlide key={index}>
                      <Card
                        loading={false}
                        collection={nft}
                        link={`/collection/`}
                      />
                    </SwiperSlide>
                  ))}
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
