// Search Result Swiper
function handleDetailSwiper() {
  const detailSwiper = new Swiper('.detail-swiper-wrapper .swiper', {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 10,
    pagination: {
      el: '.swiper-pagination',
    },
  });
}
handleDetailSwiper();
