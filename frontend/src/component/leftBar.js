import React from 'react'

const Index = () => {
  return (
    <div className="left-sidebar">
    <div className="links-flex">
      <div className="white-logo">
        <a href="#" >
          <img
            src="./assets/twitter-white.png"
            className="twitter-white-logo"
            alt="Twitter White Logo"
          />
        </a>
      </div>
      <div className="link-flex">
        <img src="./assets/hashtag.svg" className="link-icon" alt="" />
        <p className="link-text">Explore</p>
      </div>
      <div className="link-flex">
        <img src="./assets/setting.svg" className="link-icon" alt="" />
        <p className="link-text">Settings</p>
      </div>
    </div>
  </div>
  )
}

export default Index