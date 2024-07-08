import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';



const Blog = () => {
    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/cx3PDJL/winnig-Play.jpg)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-lg">
                        <h1 className="mb-5 text-5xl font-bold">Hello EveryOne</h1>
                        <p className="mb-5">Winning provides a deep sense of accomplishment and validation, boosting confidence and resilience. It opens doors to new opportunities and personal growth, inspiring others and fostering a positive mindset towards challenges and continual improvement.</p>
                        
                    </div>
                </div>
            </div>

           

            <div className="my-6">
            <h3 className="text-4xl text-center font-semibold">Trending Now</h3>

                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper my-10"
                >
                    <SwiperSlide>
                    <div>
                        <img src="https://i.ibb.co/HHznxSS/booksl.jpg" alt="" />
                        <p className='text-sm lg:text-xl font-bold text-center'>20 june 2024</p>
                        <h2 className='text-md lg:text-3xl font-bold text-center'>review book</h2>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div>
                        <img src="https://i.ibb.co/D7rBcX0/article.jpg" alt="" />
                        <p className='text-sm lg:text-xl font-bold text-center'>29 May 2024</p>
                        <h2 className='text-md lg:text-3xl font-bold text-center'>Areticle writing</h2>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div>
                        <img src="https://i.ibb.co/GvSR4tW/bussiness-Plan.jpg" alt="" />
                        <p className='text-sm lg:text-xl font-bold text-center'>17 june 2024</p>
                        <h2 className='text-md lg:text-3xl font-bold text-center'>bussiness-Plan</h2>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div>
                        <img src="https://i.ibb.co/KjHPJQn/imgdesign.jpg" alt="" />
                        <p className='text-sm lg:text-xl font-bold text-center'>22 april 2024</p>
                        <h2 className='text-md lg:text-3xl font-bold text-center'>Creative Image Design</h2>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div>
                        <img src="https://i.ibb.co/HHznxSS/booksl.jpg" alt="" />
                        <p className='text-sm lg:text-xl font-bold text-center'>20 june 2024</p>
                        <h2 className='text-md lg:text-3xl font-bold text-center'>review book</h2>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div>
                        <img src="https://i.ibb.co/D7rBcX0/article.jpg" alt="" />
                        <p className='text-sm lg:text-xl font-bold text-center'>29 May 2024</p>
                        <h2 className='text-md lg:text-3xl font-bold text-center'>Areticle writing</h2>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div>
                        <img src="https://i.ibb.co/GvSR4tW/bussiness-Plan.jpg" alt="" />
                        <p className='text-sm lg:text-xl font-bold text-center'>17 june 2024</p>
                        <h2 className='text-md lg:text-3xl font-bold text-center'>bussiness-Plan</h2>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide>
                    <div>
                        <img src="https://i.ibb.co/KjHPJQn/imgdesign.jpg" alt="" />
                        <p className='text-sm lg:text-xl font-bold text-center'>22 april 2024</p>
                        <h2 className='text-md lg:text-3xl font-bold text-center'>Creative Image Design</h2>
                    </div>
                    </SwiperSlide>
                   
                 
                   

                </Swiper>

            </div>


        </div>
    );
};

export default Blog;