// Search Result Swiper
function searchSwiper() {
  const searchResultSwiper = new Swiper(
    '.search-result-swiper-wrapper .swiper',
    {
      slidesPerView: 1,
      loop: true,
      spaceBetween: 10,
      pagination: {
        el: '.swiper-pagination',
      },
    }
  );
}
searchSwiper();

const searchForm = document.querySelector('.search-form form');
