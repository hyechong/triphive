var APIKEYS = {};

window.addEventListener('DOMContentLoaded', function () {
  this.fetch('https://ckgpwl2.cafe24.com/triphive/apikey.php')
    .then((d) => d.json())
    .then((r) => {
      APIKEYS.airbnbkey = r.airbnbkey;
      APIKEYS.mapkey = r.mapkey;

      // FOR GOOGLEMAP
      const googleMapElmt = document.createElement('script');
      googleMapElmt.type = 'text/javascript';
      googleMapElmt.async = true;
      googleMapElmt.src = `https://maps.googleapis.com/maps/api/js?key=${APIKEYS.mapkey}&callback=initMap`;
      document.body.insertAdjacentElement('beforeend', googleMapElmt);

      // FOR indexapi.js
      if (typeof getPopularRoomData === 'function') {
        getPopularRoomData();
      }

      // FOR detailapi.js
      if (
        window.location.href.includes('search') &&
        typeof getSearchDetailData === 'function'
      ) {
        getSearchDetailData();
      } else if (
        window.location.href.includes('ne_lat') &&
        typeof getNearDetailData === 'function'
      ) {
        getNearDetailData();
      } else if (typeof getKoreaDetailData === 'function') {
        getKoreaDetailData();
      }

      // FOR resultapi.js
      if (typeof getSearchRoomData === 'function') {
        getSearchRoomData(APIKEYS.airbnbkey);
      }
    });
});
