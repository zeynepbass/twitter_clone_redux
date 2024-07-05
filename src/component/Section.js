import React from 'react'

const Section = () => {
  return (
    <div class="middle-section">
      <div class="top-nav">
        <div class="search-flex">
          <div class="search-bar">
            <img src="./assets/search.svg" class="search-icon" alt="" />
            <input type="text" placeholder="Search Twitter" />
          </div>
          <img src="./assets/setting.svg" class="setting-icon" alt="" />
        </div>

        <div class="tab">
        <button class="tablinks" onclick="switchTabs(event, 'Trending')">
            For You
          </button>
          <button class="tablinks" onclick="switchTabs(event, 'Trending')">
            Trending
          </button>
        
        </div>
      </div>

      <div id="ForYou" class="tabcontent">
        <div class="tabs-main-img">
          <h3>Trending For You</h3>
          <p>Building your tech career @ AccioJob</p>
        </div>
        <div class="trending-box">
          <p class="trending-heading">Trending In India</p>
          <p class="trending-text">#earthquake</p>
          <p class="trending-heading">
            Trending with <a href="#" class="twitter-links">#BREAKING_NEWS</a>
          </p>
        </div>

        <div
          class="tabs-main-img"
          style={{
            backgroundImage: `linear-gradient(
                to bottom,
                rgba(0, 0, 0, 0),
                rgba(0, 0, 0, 0.7)
              ),
              url('assets/pollution.jpeg')`
          }}>
          <h3>Pollution</h3>
          <p>Pollution in Delhi is rising.</p>
        </div>
        <div class="trending-box">
          <p class="trending-heading">Pollution Trends</p>
          <p class="trending-text">#pollution</p>
          <p class="trending-heading">1.418k Tweets</p>
        </div>
      </div>

      <div id="Trending" class="tabcontent">
        <h3 style={{margin: "1rem"}}>Trends In India</h3>
        <div class="trending-box">
          <p class="trending-heading">1. Earthquake</p>
          <p class="trending-text">#earthquake</p>
          <p class="trending-heading">99.99k Tweets</p>
        </div>
        <div class="trending-box">
          <p class="trending-heading">2. Earthquake</p>
          <p class="trending-text">#earthquake</p>
          <p class="trending-heading">99.99k Tweets</p>
        </div>
        <div class="trending-box">
          <p class="trending-heading">3. Earthquake</p>
          <p class="trending-text">#earthquake</p>
          <p class="trending-heading">99.99k Tweets</p>
        </div>
        <div class="trending-box">
          <p class="trending-heading">4. Earthquake</p>
          <p class="trending-text">#earthquake</p>
          <p class="trending-heading">99.99k Tweets</p>
        </div>
        <div class="trending-box">
          <p class="trending-heading">5. Earthquake</p>
          <p class="trending-text">#earthquake</p>
          <p class="trending-heading">99.99k Tweets</p>
        </div>
        <div class="trending-box">
          <p class="trending-heading">6. Earthquake</p>
          <p class="trending-text">#earthquake</p>
          <p class="trending-heading">99.99k Tweets</p>
        </div>
        <div class="trending-box">
          <p class="trending-heading">7. Earthquake</p>
          <p class="trending-text">#earthquake</p>
          <p class="trending-heading">99.99k Tweets</p>
        </div>
        <div class="trending-box">
          <p class="trending-heading">8. Earthquake</p>
          <p class="trending-text">#earthquake</p>
          <p class="trending-heading">99.99k Tweets</p>
        </div>
        <div class="trending-box">
          <p class="trending-heading">9. Earthquake</p>
          <p class="trending-text">#earthquake</p>
          <p class="trending-heading">99.99k Tweets</p>
        </div>
      </div>


    </div>
  )
}

export default Section