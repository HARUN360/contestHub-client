
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import useContest from "../../hukse/useContest";
const Slider = () => {

    const [contest] = useContest();

    return (
        <div className="my-16">
            <h1 className='text-5xl text-center font-bold my-6'>Best Contest Creator</h1>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
              
                {
                    contest.slice(0,3).map(review => <SwiperSlide key={review._id}
                    >
                      <div>
                      <div className="hero min-h-screen bg-base-200">
                            <div className="hero-content flex-col lg:flex-row">
                                <img src={review.image} />
                                <div>
                                    <h1 className="text-5xl font-bold">{review.name}</h1>
                                    <h1 className="text-2xl font-bold">{review.contestType}</h1>
                                    <p className="text-lg">{review.description}</p>

                                </div>
                            </div>
                        </div>
                      </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Slider;