window.addEventListener('load', function () {
  getPopularRoomData();
});

// Popular Room Section
async function getPopularRoomData() {
  const url =
    'https://airbnb13.p.rapidapi.com/search-location?location=Korea&checkin=2023-09-16&checkout=2023-09-17&adults=1&children=0&infants=0&pets=0&page=1&currency=USD';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '21b06b6cf8msh0b811f925acc780p1be05ajsnae0fcc00774b',
      'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com',
    },
  };
  console.log(url);
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const popularRoomSwiperWrapper = document.querySelector(
      '.popular-room-swiper-wrapper .swiper-wrapper'
    );
    let popularRoomList = '';

    // console.log(data);
    data.results.forEach((roomInfo) => {
      // console.log(roomInfo);
      popularRoomList = `
        <div class="swiper-slide">
          <div class="popular-room-image-wrapper">
            <a href="/triphive/detail.html">
              <img src="${roomInfo.images[0]}" alt="">
              <div class="popular-room-text-wrapper">
                <h4>${roomInfo.name}</h4>
              </div>
            </a>
          </div>
        </div>
      `;

      popularRoomSwiperWrapper.insertAdjacentHTML('beforeend', popularRoomList);
    });
    popularSwiper();
  } catch (error) {
    console.error(error);
  }
}

// Popular Room Swiper
function popularSwiper() {
  const popularRoomSwiper = new Swiper('.popular-room-swiper-wrapper .swiper', {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 10,
  });
}

navigator.geolocation.getCurrentPosition(getNearRoomData, getError);

function getError() {
  console.error('Error : ' + error);
}

async function getNearRoomData(position) {
  const lat = Number(position.coords.latitude.toFixed(2));
  const lng = Number(position.coords.longitude.toFixed(2));

  const url = `https://airbnb13.p.rapidapi.com/search-geo?ne_lat=${(
    lat + 0.05
  ).toFixed(2)}&ne_lng=${(lng + 0.05).toFixed(2)}&sw_lat=${(lat - 0.05).toFixed(
    2
  )}&sw_lng=${(lng - 0.05).toFixed(
    2
  )}&checkin=2023-09-15&checkout=2023-09-16&adults=1&children=0&infants=0&pets=0&page=1&currency=USD`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '21b06b6cf8msh0b811f925acc780p1be05ajsnae0fcc00774b',
      'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const nearRoomSwiperWrapper = document.querySelector(
      '.near-room-swiper-wrapper .swiper-wrapper'
    );
    let nearRoomList = '';

    // console.log(data);
    data.results.forEach((roomInfo) => {
      // console.log(roomInfo);
      nearRoomList = `
        <div class="swiper-slide">
          <div class="near-room-image-wrapper">
            <a href="/triphive/detail.html">
              <img src="${roomInfo.images[0]}" alt="">
              <div class="near-room-text-wrapper">
                <h4>${roomInfo.name}</h4>
              </div>
            </a>
          </div>
        </div>
      `;

      nearRoomSwiperWrapper.insertAdjacentHTML('beforeend', nearRoomList);
    });
    nearSwiper();
  } catch (error) {
    console.error(error);
  }
}

// Popular Room Swiper
function nearSwiper() {
  const nearRoomSwiper = new Swiper('.near-room-swiper-wrapper .swiper', {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 10,
  });
}
