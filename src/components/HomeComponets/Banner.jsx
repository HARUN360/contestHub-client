import {  useState } from "react";
import SearchContest from "./SearchContest";
import './ExtraCss/Banner.css'
const Banner = () => {
    const [search, setSearch] = useState('');
    const [count, setCout] = useState(false)
    const handleSearch = e => {
        e.preventDefault();
        const searchText = e.target.search.value;
        console.log(searchText);
        setSearch(searchText);
        setCout(true)
    }

    return (
        <div className="my-6">

            <div className="hero rounded-xl my-6 banner" >
                <div className="hero-content">
                    
                    <div className=" text-center py-[100px]">
                        <h1 className="text-5xl font-semibold text-white">Welcome to ContestHub</h1>
                        <p className="py-6 text-white md:mx-40"> your ultimate destination for all things competitive! Whether you are looking to showcase your talents, participate in thrilling challenges, or discover exciting contests across various fields, ContestHub has you covered. Join our vibrant community and elevate your competitive spirit today!</p>
                        <div className="bg-green-300 w-[320px] p-2 rounded-xl ml-2  inline-block">
                            <form onSubmit={handleSearch}>
                                <input type="text" name="search" placeholder="Search Your contests tags" className="py-3 px-2 rounded-md mr-2" />
                                <input type="submit" value="Search" className="btn" />
                            </form>

                            
                        </div>
                    </div>
                </div>
            </div>
            
            { count && <SearchContest search={search}></SearchContest> }


        </div>
    );
};

export default Banner;

// https://www.npmjs.com/package/react-countup