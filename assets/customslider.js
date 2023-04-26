$(document).ready(function() {
  var activeSlideIndex = 0;
  var activeSlideBullet = 0;
  var round = 1;
  $("#next_slide_button").click(function() {
    $(".slide_bullet.slide_bullet_active").removeClass("slide_bullet_active")
    if(activeSlideBullet === $('.slide_bullet').length-1) {
      activeSlideBullet = -1;
    } 
     if (activeSlideIndex > $('.slide').length-1) {
      activeSlideIndex = 0;
    }
    $(".slide").each(function(i) {
      if(activeSlideIndex === 0) {
        console.log("hi");
      if(i === activeSlideIndex) {
        $(this).addClass("slide_inactive");
        $(this).removeClass("slide_active");
        $("#slide1_container .slide_image").removeClass("img_initial_animation");
        $("#slide1_container .slide_background").addClass("left_slide");
      } else if(i === activeSlideIndex+1) {
        $(this).addClass("slide_active");
        $(this).removeClass("to_initial_state");
      } else if (i === activeSlideIndex+2) {
        $(this).removeClass("hide_slide");
        $("#slide3_container .slide_image").addClass("img_initial_animation");
        if( round === 1) {
          $(this).addClass("slide_initial_state");
        } else {
          $(this).addClass("to_initial_state");
          $("#slide3_background").css("clip-path", "inset(13% 0% 53% 35% round 0%)")
          $(this).removeClass("slide_inactive");
        }
      }
    } else if (activeSlideIndex === 1) {
      if(i === activeSlideIndex-1) {
        $(this).addClass("to_initial_state");
        $("#slide1_background").css("clip-path", "inset(18% 0% 48% 35% round 0%)")
        $(".slide_btn").removeClass("btn_initial_animation");
        $(".slide_number").removeClass("num_initial_animation")
        $(".slide_image").addClass("img_initial_animation");
        $(".slide_heading").removeClass("head_initial_animation")
        $(this).removeClass("slide1_initial_animation");
        $(this).removeClass("slide_inactive");
      } else if(i === activeSlideIndex) {
        $("#slide2_container .slide_image").removeClass("img_initial_animation");
        $(this).addClass("slide_inactive");
        $(this).removeClass("slide_active");
        $("#slide2_container .slide_background").addClass("left_slide");
      } else if(i === activeSlideIndex+1) {
        $(this).addClass("slide_active");
        $(this).removeClass("slide_initial_state");
        $(this).removeClass("to_initial_state");
      }
    } else if(activeSlideIndex === 2) {
      if(i === activeSlideIndex-2) {
        $(this).addClass("slide_active");
        $(this).removeClass("slide_initial_state");
        $(this).removeClass("to_initial_state");
      } else if(i === activeSlideIndex-1) {
        $(this).removeClass("slide_inactive");
        $(this).addClass("to_initial_state");
        $("#slide2_container .slide_image").addClass("img_initial_animation");
      } else if(i === activeSlideIndex) {
        $(this).addClass("slide_inactive");
        $(this).removeClass("slide_active");
        $("#slide3_container .slide_image").removeClass("img_initial_animation");
        $("#slide3_container .slide_background").addClass("left_slide");
      }
    }
    });
    activeSlideIndex++;
    round++;
    $(".slide_bullet").each(function (i) {
      if(i === activeSlideBullet+1) {
        $(this).addClass("slide_bullet_active");
        activeSlideBullet++;
        return false;
      }
    });
  });
});