// Import Swiper React components
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./swiperRound.scss";
import { useAppSelector } from "../../../store/redux/hooks";
import { selectRoundsOrderByCreatedDESC } from "../../../store/reducers/game/gameSlice";
import { RoundItem } from "../rounds/RoundItem";
import { useEffect, useRef } from "react";

export const SwipeRound = () => {
  const rounds = useAppSelector(selectRoundsOrderByCreatedDESC);

  let roundPos = rounds.length;
  const swiperRef = useRef<SwiperRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
  }, [rounds]);

  return (
    <section ref={containerRef} className="flex-grow-1">
      <Swiper
        ref={swiperRef}
        initialSlide={rounds.length}
        pagination={pagination}
        modules={[Pagination]}
        // className="mySwiper "
      >
        {rounds.map((round, idx) => {
          roundPos--;
          const isLatestRound = idx === 0;
          return (
            <SwiperSlide key={round}>
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
    </section>
  );
};
