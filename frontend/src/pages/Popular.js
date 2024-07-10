import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../actions/home";
import {Link} from "react-router-dom"
const Popular = () => {
    const [user,setUser]=useState(false)
  const dispatch = useDispatch();
  const yaziListesi = useSelector((state) => state.yaziListesi);

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);
  return (
    <div className="middle-Popular">
      <div className="top-nav">
        <div className="search-flex">
          <div className="search-bar">
            <img src="./assets/search.svg" className="search-icon" alt="" />
            <input type="text" placeholder="Search Twitter" />
          </div>
          <img src="./assets/setting.svg" className="setting-icon" alt="" />
        </div>

        <div className="tab">
          <button className="tablinks"  href="ForYou">
            Popular
          </button>
          <button className="tablinks" href="kisiler" onCLick={()=>setUser(true)}>
            Kişiler
          </button>
        </div>
      </div>

      <div id="ForYou" className="tabcontent">
        {yaziListesi.map((item, index) => {
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
      <div id="kisiler" className="tabcontent" style={{ display: user ? 'block' : 'none' }} >
        {yaziListesi.map((item, index) => {
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
  );
};

export default Popular;
