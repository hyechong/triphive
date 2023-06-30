const loader = document.querySelector('.preloader');
// let APIKEYS = {};

// window.addEventListener('DOMContentLoaded', function () {
getPopularRoomData();
// this.fetch(endPoints.apiKeys)
//   .then((d) => d.json())
//   .then((r) => {
//     APIKEYS.airbnbkey = r.airbnbkey;
//     APIKEYS.mapkey = r.mapkey;
//   });
// });

// Popular Room Section
async function getPopularRoomData() {
  console.log(APIKEYS.airbnbkey);
  const url =
    'https://airbnb13.p.rapidapi.com/search-location?location=Korea&checkin=2023-09-16&checkout=2023-09-17&adults=1&children=0&infants=0&pets=0&page=1&currency=KRW';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': APIKEYS.airbnbkey,
      'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com',
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const popularRoomSwiperWrapper = document.querySelector(
      '.popular-room-swiper-wrapper .swiper-wrapper'
    );
    let popularRoomList = '';

    data.results.forEach((roomInfo) => {
      popularRoomList = `
        <div class="swiper-slide">
        <a href="/triphive/pages/detail.html?room_id=${roomInfo.id}">
          <div class="popular-room-image-wrapper">
            <img src="${roomInfo.images[0]}" alt="">
          </div>
          <div class="popular-room-text-wrapper">
            <h4>${roomInfo.name}</h4>
            <span>${roomInfo.address}</span>
          </div>
        </a>
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
  // console.log(APIKEYS.airbnbkey);
  const lat = Number(position.coords.latitude);
  const lng = Number(position.coords.longitude);

  const url = `https://airbnb13.p.rapidapi.com/search-geo?ne_lat=${(
    lat + 0.05
  ).toFixed(2)}&ne_lng=${(lng + 0.05).toFixed(2)}&sw_lat=${(lat - 0.05).toFixed(
    2
  )}&sw_lng=${(lng - 0.05).toFixed(
    2
  )}&checkin=2023-09-15&checkout=2023-09-16&adults=1&children=0&infants=0&pets=0&page=1&currency=KRW`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': APIKEYS.airbnbkey,
      'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    // loaderRing.classList.remove('loading');
    const nearRoomSwiperWrapper = document.querySelector(
      '.near-room-swiper-wrapper .swiper-wrapper'
    );
    let nearRoomList = '';

    // console.log(data);
    data.results.forEach((roomInfo) => {
      // console.log(roomInfo);
      nearRoomList = `
        <div class="swiper-slide">
          <a href="/triphive/pages/detail.html?ne_lat=${(lat + 0.05).toFixed(
            2
          )}&ne_lng=${(lng + 0.05).toFixed(2)}&sw_lat=${(lat - 0.05).toFixed(
        2
      )}&sw_lng=${(lng - 0.05).toFixed(2)}&room_id=${roomInfo.id}">
            <div class="near-room-image-wrapper">
              <img src="${roomInfo.images[0]}" alt="">
            </div>
            <div class="near-room-text-wrapper">
              <h4>${roomInfo.name}</h4>
              <span>${roomInfo.address}</span>
            </div>
          </a>
        </div>
      `;

      nearRoomSwiperWrapper.insertAdjacentHTML('beforeend', nearRoomList);
    });
    nearSwiper();
    loader.classList.add('loaded');
  } catch (error) {
    console.error(error);
  }
}

// Near Room Swiper
function nearSwiper() {
  const nearRoomSwiper = new Swiper('.near-room-swiper-wrapper .swiper', {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 10,
  });
}

// Search
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', function () {
  const keyValue = document.querySelector('.search-input').value;
  if (keyValue == '' || null || undefined) {
    alert('여행지를 입력하세요');
  } else {
    location.href = `/triphive/pages/result.html?search=${keyValue}`;
  }
});
