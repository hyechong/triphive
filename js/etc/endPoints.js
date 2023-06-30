var endPoints = {
  apiKeys: `https://ckgpwl2.cafe24.com/triphive/apikey.php`,
};

var APIKEYS = {};

window.addEventListener('DOMContentLoaded', function () {
  this.fetch(endPoints.apiKeys)
    .then((d) => d.json())
    .then((r) => {
      APIKEYS.airbnbkey = r.airbnbkey;
      APIKEYS.mapkey = r.mapkey;

      if (typeof getPopularRoomData === 'function') {
        getPopularRoomData();
      }
      // getPopularRoomData(APIKEYS.airbnbkey);
    });
});

// window.APIKEYS = {};

// window.addEventListener('load', function () {
//   this.fetch(endPoints.apiKeys)
//     .then((d) => d.json())
//     .then((r) => {
//       window.APIKEYS.airbnbkey = r.airbnbkey;
//       window.APIKEYS.mapkey = r.mapkey;
//     });
// });
