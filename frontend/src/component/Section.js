import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../actions/home";
import {Link} from "react-router-dom"
const Section = () => {
  const dispatch = useDispatch();
  const yaziListesi = useSelector((state) => state.Index.yaziListesi);

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);
console.log(yaziListesi)
  return (
    <>
   
    <div className="middle-section">
      <div className="top-nav">
        <div className="search-flex">
          <div className="search-bar">
            <img src="./assets/search.svg" className="search-icon" alt="" />
            <input type="text" placeholder="Search Twitter" />
          </div>
          <img src="./assets/setting.svg" className="setting-icon" alt="" />
        </div>

        <div className="tab">
          <button className="tablinks" onclick="switchTabs(event, 'Trending')">
            For You
          </button>
          <button className="tablinks" onclick="switchTabs(event, 'Trending')">
            Trending
          </button>
        </div>
      </div>

      <div id="ForYou" className="tabcontent">
        {yaziListesi && yaziListesi.map((item, index) => {
          return (
            <>
  
              <div className="trending-box" style={{ cursor: "pointer" }}>
                <p className="trending-heading">{item.baslik}</p>
                <p className="trending-text">{item.acikla}</p>
                <p className="trending-heading">
                  <a
                    href="#"
                    className="twitter-links"
                    style={{ margin: "0 5px" }}
                  >
                    {item.tags.map((tag) => `#${tag} `)}
                   
                  </a>
                </p>
              </div>
 
              <div
                className="tabs-main-img"
                style={{
                  backgroundImage: `linear-gradient(
                  to bottom,
                  rgba(0, 0, 0, 0),
                  rgba(0, 0, 0, 0.7)
                ),
                url(${item.selectedFile})`,
                }}
              >
                <h3 >{item.baslik}</h3>
                <Link to={`/detay/${item._id}`} >
                <p  >{item.acikla}</p>
                </Link>
              </div>
   
         
            </>
          );
        })}
      </div>
    </div>
    </>
  );
};

export default Section;
