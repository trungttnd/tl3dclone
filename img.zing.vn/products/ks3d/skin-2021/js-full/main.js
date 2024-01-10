$(function () {
  var bannerSwiper = new Swiper("#homeBanner", {
    autoplay: {
        delay: 5000,
    },
    pagination: {
      el: "#homeBanner .swiper-pagination",
      clickable: true,
    },
  });
  var characterSwiper = new Swiper("#homeCharacter", {
    effect: "fade",
    speed: 500,
    pagination: {
      el: "#homeCharacter .swiper-pagination",
      clickable: true,
    },
  });
});
