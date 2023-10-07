exports.map = () => {
    ymaps.ready(init);
    function init(){
      const myMap = new ymaps.Map("map", {
          center: [55.760221, 37.618561],
          zoom: 13,
          controls: ['geolocationControl', 'zoomControl'],
      },
      {
        suppressMapOpenBlock: true,
        geolocationControlSize: "large",
        geolocationControlPosition:  { top: "200px", right: "20px" },
        geolocationControlFloat: 'none',
        zoomControlSize: "small",
        zoomControlFloat: "none",
        zoomControlPosition: { top: "120px", right: "20px" }
      });

      const myPlacemark = new ymaps.Placemark([55.770233, 37.636787], {}, {
        iconLayout: 'default#image',
        iconImageHref: '../img/label.png',
        iconImageSize: [20, 20],
        iconImageOffset: [-3, -42],
      });
      myMap.geoObjects.add(myPlacemark);
    };
}

