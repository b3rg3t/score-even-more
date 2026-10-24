import { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { useAppSelector } from "../../../../store/redux/hooks";
import { selectRoundsOrderByCreatedDESC } from "../../../../store/reducers/game/gameSlice";
import { RoundItem } from "../../rounds/RoundItem";

import "./swiperRound.scss";
import { FaChevronLeft } from "react-icons/fa";
import {
  CgChevronLeft,
  CgChevronRight,
  CgPushChevronLeft,
  CgPushChevronRight,
} from "react-icons/cg";

export const SwipeRound = () => {
  const rounds = useAppSelector(selectRoundsOrderByCreatedDESC);

  const swiperRef = useRef<SwiperRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleBulletCount = 5;
  const firstVisibleBullet = Math.min(
    Math.max(activeIndex - Math.floor(visibleBulletCount / 2), 0),
    Math.max(rounds.length - visibleBulletCount, 0),
  );
  const visibleRounds = rounds.slice(
    firstVisibleBullet,
    firstVisibleBullet + visibleBulletCount,
  );

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(rounds.length);
      setActiveIndex(Math.max(rounds.length - 1, 0));
    }
  }, [rounds.length]);

  return (
    <section className="flex-grow-1 d-flex position-relative">
      <div className="align-items-stretch w-100">
        <Swiper
          ref={swiperRef}
          initialSlide={rounds.length}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {rounds.map((round, idx) => {
            const isLatestRound = idx + 1 === rounds.length;
            return (
              <SwiperSlide key={round} className="">
                <RoundItem
                  listItem={false}
                  roundId={round}
                  roundPos={idx}
                  isLatestRound={isLatestRound}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      {rounds.length > 0 && (
        <nav className="round-pagination" aria-label="Round pagination">
          <button
            type="button"
            className="round-pagination__arrow"
            aria-label="Go to first round"
            disabled={activeIndex === 0}
            onClick={() => swiperRef.current?.swiper.slideTo(0)}
          >
            <CgPushChevronLeft />
          </button>
          <button
            type="button"
            className="round-pagination__arrow"
            aria-label="Previous round"
            disabled={activeIndex === 0}
            onClick={() => swiperRef.current?.swiper.slidePrev()}
          >
            <CgChevronLeft />
          </button>
          {visibleRounds.map((round, index) => {
            const roundIndex = firstVisibleBullet + index;
            const isActive = roundIndex === activeIndex;
            return (
              <button
                key={round}
                type="button"
                className={`swiper-pagination-bullet status-badge${
                  isActive ? " swiper-pagination-bullet-active" : ""
                }`}
                aria-label={`Round ${roundIndex + 1}`}
                aria-current={isActive ? "page" : undefined}
                onClick={() => swiperRef.current?.swiper.slideTo(roundIndex)}
              >
                {roundIndex + 1}
              </button>
            );
          })}

          <button
            type="button"
            className="round-pagination__arrow"
            aria-label="Next round"
            disabled={activeIndex >= rounds.length - 1}
            onClick={() => swiperRef.current?.swiper.slideNext()}
          >
            <CgChevronRight />
          </button>
          <button
            type="button"
            className="round-pagination__arrow"
            aria-label="Go to last round"
            disabled={activeIndex >= rounds.length - 1}
            onClick={() => swiperRef.current?.swiper.slideTo(rounds.length - 1)}
          >
            <CgPushChevronRight />
          </button>
        </nav>
      )}
    </section>
  );
};
