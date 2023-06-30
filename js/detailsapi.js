// Detail Swiper
function handleDetailSwiper() {
  const detailSwiper = new Swiper('.detail-swiper-wrapper .swiper', {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 10,
    pagination: {
      el: '.detail-swiper-pagination',
    },
  });
}

var searchValue2 = new URLSearchParams(location.search).get('search');

const neLat = new URLSearchParams(location.search).get('ne_lat');
const neLng = new URLSearchParams(location.search).get('ne_lng');
const swLat = new URLSearchParams(location.search).get('sw_lat');
const swLng = new URLSearchParams(location.search).get('sw_lng');
const roomID = new URLSearchParams(location.search).get('room_id');

const loadingSocket = document.querySelector('.socket');

// Search Detail Section
async function getSearchDetailData() {
  const url = `https://airbnb13.p.rapidapi.com/search-location?location=${searchValue2}&checkin=2023-09-16&checkout=2023-09-17&adults=1&children=0&infants=0&pets=0&page=1&currency=KRW`;
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
    const detailSwiperWrapper = document.querySelector(
      '.detail-swiper-wrapper .swiper-wrapper'
    );
    const detailTxtWrapper = document.querySelector('.detail-text-wrapper');
    let roomDetailImg = '';
    let roomDetailTxt = '';

    // console.log(data);
    data.results.forEach((roomInfo) => {
      if (roomInfo.id == roomID) {
        // console.log(image);
        for (let i = 0; i < roomInfo.images.length; i++) {
          roomDetailImg = `
            <div class="swiper-slide">
              <div class="detail-image-wrapper">
                <img src="${roomInfo.images[i]}" alt="">
              </div>
            </div>
          `;
          detailSwiperWrapper.insertAdjacentHTML('beforeend', roomDetailImg);
        }
        roomDetailTxt = `
          <div class="main-detail-section section">
            <h4>${roomInfo.name}</h4>
            <span><i class="ri-star-fill"> ${roomInfo.rating}</i> ${
          roomInfo.address
        }</span>
            <p>₩ ${roomInfo.price.total.toLocaleString()}/박</p>
          </div>
          <div class="facilities-detail-section section">
            <div class="detail-subtitle">
              <h4>숙소 시설</h4>
            </div>
            <div class="facilities">
              <div class="facility-box" id="bathroom">
                <div class="facility-image-wrapper">
                  <img src="/triphive/images/bathroom.512x381.png" alt="">
                </div>
                <span>욕실 ${roomInfo.bathrooms}개</span>
              </div>
              <div class="facility-box" id="bedroom">
                <div class="facility-image-wrapper">
                  <img src="/triphive/images/bedroom.512x410.png" alt="">
                </div>
                <span>침실 ${roomInfo.bedrooms}개, 침대 ${
          roomInfo.beds
        }개</span>
              </div>
            </div>
          </div>
          <div class="hostig-map-section section">
            <div class="detail-subtitle">
              <h4>호스팅 지역</h4>
              <div class="map-wrapper">
                <div id="map">

                </div>
              </div>
            </div>
          </div>
        `;
        detailTxtWrapper.insertAdjacentHTML('beforeend', roomDetailTxt);
        initMap(roomInfo.lat, roomInfo.lng);
      }
    });
    loadingSocket.style.visibility = 'hidden';
    loadingSocket.style.zIndex = '-999';
    loadingSocket.style.opacity = '0';
    handleDetailSwiper();
  } catch (error) {
    console.error(error);
  }
}

// Korea Detail Section
async function getKoreaDetailData() {
  const url = `https://airbnb13.p.rapidapi.com/search-location?location=Korea&checkin=2023-09-16&checkout=2023-09-17&adults=1&children=0&infants=0&pets=0&page=1&currency=KRW`;
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
    const detailSwiperWrapper = document.querySelector(
      '.detail-swiper-wrapper .swiper-wrapper'
    );
    const detailTxtWrapper = document.querySelector('.detail-text-wrapper');
    let roomDetailImg = '';
    let roomDetailTxt = '';

    // console.log(data);
    data.results.forEach((roomInfo) => {
      if (roomInfo.id == roomID) {
        // console.log(image);
        for (let i = 0; i < roomInfo.images.length; i++) {
          roomDetailImg = `
            <div class="swiper-slide">
              <div class="detail-image-wrapper">
                <img src="${roomInfo.images[i]}" alt="">
              </div>
            </div>
          `;
          detailSwiperWrapper.insertAdjacentHTML('beforeend', roomDetailImg);
        }
        console.log(roomInfo);
        roomDetailTxt = `
          <div class="main-detail-section section">
            <h4>${roomInfo.name}</h4>
            <span><i class="ri-star-fill"> ${roomInfo.rating}</i> ${
          roomInfo.address
        }</span>
            <p>₩ ${roomInfo.price.total.toLocaleString()}/박</p>
          </div>
          <div class="facilities-detail-section section">
            <div class="detail-subtitle">
              <h4>숙소 시설</h4>
            </div>
            <div class="facilities">
              <div class="facility-box" id="bathroom">
                <div class="facility-image-wrapper">
                  <img src="/triphive/images/bathroom.512x381.png" alt="">
                </div>
                <span>욕실 ${roomInfo.bathrooms}개</span>
              </div>
              <div class="facility-box" id="bedroom">
                <div class="facility-image-wrapper">
                  <img src="/triphive/images/bedroom.512x410.png" alt="">
                </div>
                <span>침실 ${roomInfo.bedrooms}개, 침대 ${
          roomInfo.beds
        }개</span>
              </div>
            </div>
          </div>
          <div class="hostig-map-section section">
            <div class="detail-subtitle">
              <h4>호스팅 지역</h4>
              <div class="map-wrapper">
                <div id="map">

                </div>
              </div>
            </div>
          </div>
        `;
        detailTxtWrapper.insertAdjacentHTML('beforeend', roomDetailTxt);
        initMap(roomInfo.lat, roomInfo.lng);
      }
    });
    loadingSocket.style.visibility = 'hidden';
    loadingSocket.style.opacity = '0';
    loadingSocket.style.zIndex = '-999';
    handleDetailSwiper();
  } catch (error) {
    console.error(error);
  }
}

// Near Detail Section
async function getNearDetailData() {
  const url = `https://airbnb13.p.rapidapi.com/search-location?ne_lat=${neLat}&ne_lng=${neLng}&sw_lat=${swLat}&sw_lng=${swLng}&checkin=2023-09-16&checkout=2023-09-17&adults=1&children=0&infants=0&pets=0&page=1&currency=KRW`;
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
    const detailSwiperWrapper = document.querySelector(
      '.detail-swiper-wrapper .swiper-wrapper'
    );
    const detailTxtWrapper = document.querySelector('.detail-text-wrapper');
    let roomDetailImg = '';
    let roomDetailTxt = '';

    // console.log(data);
    data.results.forEach((roomInfo) => {
      if (roomInfo.id == roomID) {
        // console.log(image);
        for (let i = 0; i < roomInfo.images.length; i++) {
          roomDetailImg = `
            <div class="swiper-slide">
              <div class="detail-image-wrapper">
                <img src="${roomInfo.images[i]}" alt="">
              </div>
            </div>
          `;
          detailSwiperWrapper.insertAdjacentHTML('beforeend', roomDetailImg);
        }
        roomDetailTxt = `
          <div class="main-detail-section section">
            <h4>${roomInfo.name}</h4>
            <span><i class="ri-star-fill"> ${roomInfo.rating}</i> ${
          roomInfo.address
        }</span>
            <p>₩ ${roomInfo.price.total.toLocaleString()}/박</p>
          </div>
          <div class="facilities-detail-section section">
            <div class="detail-subtitle">
              <h4>숙소 시설</h4>
            </div>
            <div class="facilities">
              <div class="facility-box" id="bathroom">
                <div class="facility-image-wrapper">
                  <img src="/triphive/images/bathroom.512x381.png" alt="">
                </div>
                <span>욕실 ${roomInfo.bathrooms}개</span>
              </div>
              <div class="facility-box" id="bedroom">
                <div class="facility-image-wrapper">
                  <img src="/triphive/images/bedroom.512x410.png" alt="">
                </div>
                <span>침실 ${roomInfo.bedrooms}개, 침대 ${
          roomInfo.beds
        }개</span>
              </div>
            </div>
          </div>
          <div class="hostig-map-section section">
            <div class="detail-subtitle">
              <h4>호스팅 지역</h4>
              <div class="map-wrapper">
                <div id="map">

                </div>
              </div>
            </div>
          </div>
        `;
        detailTxtWrapper.insertAdjacentHTML('beforeend', roomDetailTxt);
        initMap(roomInfo.lat, roomInfo.lng);
      }
    });
    loadingSocket.style.visibility = 'hidden';
    loadingSocket.style.zIndex = '-999';
    loadingSocket.style.opacity = '0';
    handleDetailSwiper();
  } catch (error) {
    console.error(error);
  }
}

// Google Maps
window.initMap = function (lat, lng) {
  let map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: lat, lng: lng },
    zoom: 15,
  });
  let marker = new google.maps.Marker({
    position: { lat: lat, lng: lng },
    icon: {
      url: '/triphive/images/icons/map-marker.png',
      scaledSize: new google.maps.Size(34, 47),
    },
    map: map,
  });
};
