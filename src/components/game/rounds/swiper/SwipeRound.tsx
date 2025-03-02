import { useEffect, useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { useAppSelector } from "../../../../store/redux/hooks";
import { selectRoundsOrderByCreatedDESC } from "../../../../store/reducers/game/gameSlice";
import { RoundItem } from "../../rounds/RoundItem";

import "./swiperRound.scss";

export const SwipeRound = () => {
  const rounds = useAppSelector(selectRoundsOrderByCreatedDESC);

  let roundPos = rounds.length;
  const swiperRef = useRef<SwiperRef>(null);

  const pagination = {
    clickable: true,
    renderBullet: (index: number, className: string) => {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(rounds.length);
    }
  }, [rounds.length]);

  return (
    <section className="flex-grow-1 d-flex position-relative">
      <div className="align-items-stretch w-100">
        <Swiper
          ref={swiperRef}
          initialSlide={rounds.length}
          pagination={pagination}
          modules={[Pagination]}
        >
          {rounds.map((round, idx) => {
            roundPos--;
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
    </section>
  );
};
