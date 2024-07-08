import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'

import img1 from '../assets/sw1.jpg'
import img2 from '../assets/sw2.jpg'
import img3 from '../assets/sw3.jpg'
import img4 from '../assets/sw4.jpg'
import img5 from '../assets/sw5.jpg'

const About = () => {
    return (
        <div>
            <div>
                <Carousel>
                    <div>
                        <img src={img5} className=" " />
                    </div>
                    <div>
                        <img src={img1} className="" />
                    </div>
                    <div>
                        <img src={img2} className=" " />
                    </div>
                    <div>
                        <img src={img3} className=" " />
                    </div>
                    <div>
                        <img src={img4} className=" " />
                    </div>

                </Carousel>
            </div>
           <h3 className="text-3xl font-bold ml-4">About Contest</h3>
            <p className="ml-4">Contest Hub is your premier destination for discovering and participating in the most exciting contests across a variety of interests and industries. Whether you're a creative writer, an aspiring photographer, a coding enthusiast, or a culinary artist, we have a contest for you. Our platform connects you with opportunities to showcase your talents, compete with peers, and win fantastic prizes. <br />

                At Contest Hub, we believe in fostering a community of passionate individuals who strive for excellence and creativity. We curate a diverse range of contests to ensure there's something for everyone. Our user-friendly interface makes it easy to find, enter, and track your favorite competitions. Plus, our resources and tips can help you improve your chances of winning.
               <br />
               <br />
                Join Contest Hub today to unlock your potential, gain recognition, and celebrate your achievements. Whether you're here to compete or simply explore, Contest Hub is the ultimate space to engage and excel in your passions.</p>
        </div>
    );
};

export default About;