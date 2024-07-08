import Banner from "../components/HomeComponets/Banner";
import CompitionWinner from "../components/HomeComponets/CompitionWinner";
import PopularContest from "../components/HomeComponets/PopularContest";
import Slider from "../components/HomeComponets/Slider";


const Home = () => {
    return (
        <div>
           
            <Banner></Banner>
            <PopularContest></PopularContest>
            <CompitionWinner></CompitionWinner>
            <Slider></Slider>
        </div>
    );
};

export default Home;