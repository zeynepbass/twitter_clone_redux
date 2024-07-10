import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Detay, CommentPost } from "../actions/home";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const item = useSelector((state) => state.yaziDetay);
  const [comment, setComment] = useState("");
  useEffect(() => {
    dispatch(Detay(id));
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(comment);
    dispatch(CommentPost(id, comment));
    setComment("");
  };
  return (
    <div className="middle-section">
      <div className="top-nav">
        <div className="search-flex">
          <div className="search-bar">
            <img src="./assets/search.svg" className="search-icon" alt="" />
            <input type="text" placeholder="Search Twitter" />
          </div>
          <img src="./assets/setting.svg" className="setting-icon" alt="" />
        </div>
      </div>

      <div id="ForYou" className="tabcontent" style={{ paddingBottom: "4px" }}>
        <div className="trending-box" style={{ cursor: "pointer" }}>
          <p className="trending-heading">{item.baslik}</p>
          <p className="trending-text">{item.acikla}</p>
          <p className="trending-heading"></p>
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
          <h3>{item.baslik}</h3>
          <p>{item.acikla}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div
          className="input-container"
          style={{
            display: "flex",
            width: "100%",
            position: "relative",
          }}
        >
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="input-field"
            placeholder="Yorum yap..."
            style={{
              width: "100%",

              padding: "40px",

              fontSize: "16px",
              color: "white",
              border: "0.3px solid gray",
              borderRight: "none",
              borderLeft: "none",
              outline: "none",
               
              backgroundColor: "black",
     
            }}
          />
          <button
            className="action-button"
            style={{
              padding: " 8px 12px",
              height: "40px",
              fontSize: "16px",
              top:"40%",
              position: "absolute",
              backgroundColor: " #007bff" /* Adjust button color */,
              width: "80px",
              right: "5%",
              color: "white",
              border: "none",
              borderRadius: "40px",

              cursor: "pointer",
            }}
          >
            Gönder
          </button>
        </div>
      </form>
      <ul
        className="result-list"
        style={{
          listStyle: "none",
          maxHeight: "300px",
          overflowY: "auto",
          scrollbarColor: "gray black",
        }}
      >
        {item.comments &&
          item.comments.length > 0 &&
          item.comments
            .filter((comment) => comment !== null)
            .map((data) => (
              <li key={data} style={{ display: "flex" }}>
                <img
                  src=""
                  alt=""
                  width="30"
                  height="30"
                  style={{ borderRadius: "100%", paddingTop: "10px" }}
                />
                &nbsp;
                <p>{data}</p>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Detail;
