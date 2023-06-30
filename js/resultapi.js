// Search
var searchBtn2 = document.querySelector('.search-btn');

searchBtn2.addEventListener('click', function () {
  const keyValue = document.querySelector('.search-input').value;
  if (keyValue == '' || null || undefined) {
    alert('여행지를 입력하세요');
  } else {
    location.href = `/triphive/pages/result.html?search=${keyValue}`;
  }
});

// Search Result Swiper
function searchSwiper() {
  const searchResultSwiper = new Swiper(
    '.search-result-swiper-wrapper .swiper',
    {
      slidesPerView: 1,
      loop: true,
      spaceBetween: 10,
      pagination: {
        el: '.result-swiper-pagination',
      },
    }
  );
}

var searchValue = new URLSearchParams(location.search).get('search');

const loadingSocket = document.querySelector('.socket');

// Search Result Section
async function getSearchRoomData(airbnbkey) {
  const url = `https://airbnb13.p.rapidapi.com/search-location?location=${searchValue}&checkin=2023-09-16&checkout=2023-09-17&adults=1&children=0&infants=0&pets=0&page=1&currency=KRW`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': airbnbkey,
      'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com',
    },
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const searchRoomSection = document.querySelector('.search-results-section');
    let searchRoomList = '';

    data.results.forEach((roomInfo, idx) => {
      // console.log(roomInfo);
      searchRoomList = `
        <a href="/triphive/pages/detail.html?search=${searchValue}&room_id=${
        roomInfo.id
      }">
          <div class="search-result-swiper-wrapper">
            <div class="swiper">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <div class="result-image-wrapper">
                    <img src="${roomInfo.images[0]}" alt="">
                  </div>
                </div>
                <div class="swiper-slide">
                <div class="result-image-wrapper">
                  <img src="${roomInfo.images[1]}" alt="">
                </div>
              </div>
              <div class="swiper-slide">
              <div class="result-image-wrapper">
                <img src="${roomInfo.images[2]}" alt="">
              </div>
            </div>
              </div>
              <div class="result-swiper-pagination"></div>   
            </div>
          </div>
          <div class="result-text-wrapper">
            <h4>${roomInfo.name}</h4>
            <span>${roomInfo.address}</span>
            <p>₩ ${roomInfo.price.total.toLocaleString()}/박</p>
          </div>
        </a>
      `;

      searchRoomSection.insertAdjacentHTML('beforeend', searchRoomList);
      initMap(roomInfo.lat, roomInfo.lng);
    });
    loadingSocket.style.visibility = 'hidden';
    loadingSocket.style.opacity = '0';
    loadingSocket.style.zIndex = '-999';
    searchSwiper();
    addMarker(data.results);
  } catch (error) {
    console.error(error);
  }
}

var showMapBtn = document.querySelector('.show-map-btn');
var showListBtn = document.querySelector('.show-list-btn');
var searchResultWrapper = document.querySelector('.search-results-wrapper');

showMapBtn.addEventListener('click', function () {
  searchResultWrapper.classList.add('hide');
  showMapBtn.style.display = 'none';
  showListBtn.style.display = 'flex';
});

showListBtn.addEventListener('click', function () {
  searchResultWrapper.classList.remove('hide');
  showListBtn.style.display = 'none';
  showMapBtn.style.display = 'flex';
});

var map;

// Google Maps
function initMap(lat, lng) {
  let centerTarget = {
    lat: Number(lat),
    lng: Number(lng),
  };
  map = new google.maps.Map(document.getElementById('full-map'), {
    center: centerTarget,
    zoom: 10,
  });
}

var marker;

function addMarker(res) {
  var lat = [];
  var lng = [];

  for (var i = 0; i < res.length; i++) {
    lat.push(res[i].lat);
    lng.push(res[i].lng);
  }

  for (let i = 0; i < res.length; i++) {
    marker = new google.maps.Marker({
      position: {
        lat: lat[i],
        lng: lng[i],
      },
      icon: {
        url: '/triphive/images/icons/map-marker.png',
        scaledSize: new google.maps.Size(34, 47),
      },
      map: map,
      animation: google.maps.Animation.DROP,
    });

    if (marker) {
      marker.addListener('click', function () {
        //중심 위치를 클릭된 마커의 위치로 변경
        map.setCenter(this.getPosition());

        //마커 클릭 시의 줌 변화
        map.setZoom(14);

        //html로 표시될 인포 윈도우의 내용
        let infoWindow = new google.maps.InfoWindow({
          map: map,
          open: marker,
          position: { lat: res[i].lat, lng: res[i].lng },
          content: `
            <a href="/triphive/pages/detail.html?search=${searchValue}&room_id=${
            res[i].id
          }">
              <div class="marker-info-image-wrapper">
                <img src="${res[i].images[0]}" alt="">
              </div>
              <div class="marker-info-text-wrapper">
                <h4>${res[i].name}</h4>
                <span><i class="ri-star-fill">${res[i].rating}</i></span>
                <p>₩ ${res[i].price.total.toLocaleString()}/박</p>
              </div>
            </a>
          `,
        });
      });
    }
  }
}

function getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lng2 - lng1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}
