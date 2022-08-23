import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css'

import Styles from './styles.module.css';


export const Banner = () => {
    return (  
        <div className={Styles.container} >
            <Swiper  
                slidesPerView={1}
                className={Styles.swiper}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                loop={true}
            >
                <SwiperSlide className={Styles.slide} ><div className={Styles.slideImg} >1</div></SwiperSlide>
                <SwiperSlide className={Styles.slide} ><div className={Styles.slideImg} >2</div></SwiperSlide>
            </Swiper>
        </div>
    );
}
