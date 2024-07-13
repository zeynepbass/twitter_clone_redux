import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../actions/home";
import {Link} from "react-router-dom"
const Populer = () => {
    const [user,setUser]=useState(false)
  const dispatch = useDispatch();
  const yaziListesi = useSelector((state) => state.Index.yaziListesi);
 

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);
  const data = yaziListesi.filter((item) => {
    // Her bir öğenin tags dizisini döngüye alıp "populer" etiketini içerip içermediğini kontrol ediyoruz
    return item.tags.some(tag => tag.includes('populer'));
  });

  return (

    <div className="middle-populer">
   
      <div className="top-nav">
        <div className="search-flex">
          <div className="search-bar">
            <img src="./assets/search.svg" className="search-icon" alt="" />
            <input type="text" placeholder="Search Twitter" />
          </div>
          <img src="./assets/setting.svg" className="setting-icon" alt="" />
        </div>

        <div className="tab">
        <button className="tablinks" onClick={() => setUser(false)}>
            populer
          </button>
          {/* Kişiler sekmesi */}
          <button className="tablinks" onClick={() => setUser(true)}>
            Kişiler
          </button>
        </div>
      </div>

      <div id="ForYou" className="tabcontent" style={{ display: user ? "none" : "block" }}>
        {data.map((item, index) => {
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
      <div id="kisiler" className="tabcontent" style={{ display: user ? "block" : "none" }}>
      <>
      
{
      data && data.map((item, index) => (
        <React.Fragment key={index}>
          <div className="trending-box" style={{ cursor: "pointer" }}>
            <p className="trending-heading">{item.baslik} </p>
            <p className="trending-text">{item.acikla} </p>
            
          </div>
         
            <h3>{item.baslik}</h3>
            <Link to={`/detay/${item._id}`}>
              <p>{item.acikla}</p>
            </Link>
    
          <h1 style={{color:"red"}}></h1>
        </React.Fragment>
      ))
    }
  </>
      </div>
    </div>
  );
};

export default Populer;
