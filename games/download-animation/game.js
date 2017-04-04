'use strict';

// /* define test block */
var test_block = {
  type: "html",
  url: "{{ gamestatic('html/startup.html') }}",
  data: {video_url: "{{ gamestatic('vid/Animation_User_Test_Prototype.mp4') }}"}
};

/* create experiment timeline array */
var timeline = [];
timeline.push(test_block);

/* start the experiment */
jsPsych.init({
  timeline: timeline
  // fullscreen: true
  // on_finish: function() {
  //     $.ajax({
  //         type: 'post',
  //         cache: false,
  //         url: 'datacollector/',
  //         contentType: 'application/json; charset=utf-8',
  //         dataType: 'json',
  //         headers: {
  //             'X-CSRFToken': '{{  csrf }}'
  //         },
  //         data: jsPsych.data.dataAsJSON(),
  //         success: function(output) { console.log(output); }
  //     });
  // }
});