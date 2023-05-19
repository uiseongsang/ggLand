$(document).ready(function() {
    $('.team').click(function() {
        //window.location.href = '/playGround';  // 페이지 이동
    });
});

$(document).ready(function() {
    $('#mini').click(function() {
        window.location.href = '/playGround';  // 페이지 이동
    });
});

$(document).ready(function() {
    $('.page1').click(function() {
        window.location.href = '/detailUS';  // 페이지 이동
    });
});

$(document).ready(function() {
    $('.page2').click(function() {
        window.location.href = '/detailSI';  // 페이지 이동
    });
});

$(document).ready(function() {
    $('.page3').click(function() {
        window.location.href = '/detailSY';  // 페이지 이동
    });
});

$(document).ready(function() {
    $('.page4').click(function() {
        window.location.href = '/detailCY';  // 페이지 이동
    });
});

$(document).ready(function() {
    $('.page5').click(function() {
        window.location.href = '/detailHY';  // 페이지 이동
    });
});

$(document).ready(function () {
    $("#titlename").click(function () {
      $("#popup").fadeIn();
      $(".mainhead").fadeOut();
      $(".page1").fadeOut();
      $(".page2").fadeOut();
      $(".page3").fadeOut();
      $(".page4").fadeOut();
      $(".page5").fadeOut();
      $(".team").fadeOut();
    });
  });
  function popup_close() {
    $("#popup").fadeOut();
    $(".mainhead").fadeIn();
    $(".page1").fadeIn();
    $(".page2").fadeIn();
    $(".page3").fadeIn();
    $(".page4").fadeIn();
    $(".page5").fadeIn();
    $(".team").fadeIn();
  }