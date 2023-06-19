window.addEventListener('load', function () {
  getSearchRoomData();
});

// Search
const searchBtn2 = document.querySelector('.search-btn');

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

const searchValue = new URLSearchParams(location.search).get('search');

// Search Result Section
async function getSearchRoomData() {
  const url = `https://airbnb13.p.rapidapi.com/search-location?location=${searchValue}&checkin=2023-09-16&checkout=2023-09-17&adults=1&children=0&infants=0&pets=0&page=1&currency=KRW`;
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
    const searchRoomSection = document.querySelector('.search-results-section');
    let searchRoomList = '';
    data.results.forEach((roomInfo) => {
      // console.log(roomInfo);
      searchRoomList = `
        <a href="/triphive/pages/detail.html?search=${searchValue}&room_id=${roomInfo.id}">
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
    });
    searchSwiper();
  } catch (error) {
    console.error(error);
  }
}
