'use strict';

var delay_options = [2000, 3000, 5000];
var index = Math.floor(Math.random() * delay_options.length);
var second_index = Math.floor(Math.random() * delay_options.length);
var third_index = Math.floor(Math.random() * delay_options.length);

var survey_question = {
  type: "survey-multi-choice",
  questions: ["How many seconds did it take for the Web Browser to launch?"],
  options: [['1s', '2s', '3s', '4s', '5s', '6s', '7s', '8s']],
  required: [true],
  horizontal: true
};

/* randomize the delay and order of the versions. Add a survey question to each of them */
var test_data = [
    {data: {version: 1, delay: delay_options[index], js_url: "{{ gamestatic('js/experiment.js') }}"}, timeline: [{}, survey_question]},
    {data: {version: 2, delay: delay_options[second_index], js_url: "{{ gamestatic('js/experiment.js') }}"}, timeline: [{}, survey_question]},
    {data: {version: Math.ceil(Math.random() * 2), delay: delay_options[third_index], js_url: "{{ gamestatic('js/experiment.js') }}"}, timeline: [{}, survey_question]}
];

/* define test block */
var test_block = {
  type: "html",
  url: "{{ gamestatic('html/startup.html') }}",
  timeline: test_data,
  randomize_order: true,
  cont_btn: "end-trial"
};

/* create experiment timeline array */
var timeline = [];
timeline.push(test_block);

/* start the experiment */
var csrf = "{% csrf_token %}";
var end_message = `<p><b>Thank you again for participating</b><br/><br/>
                  You may now close this browser window.</p>`

jsPsych.init({
  timeline: timeline,
  fullscreen: `<p><b>Thank you for participating!</b><br/><br/>
              This web page will take you through a guided experiment. As part of doing that, it will simulate a desktop environment.
              You will automatically get back to your normal desktop environment at the end of the experiment.<br/><br/>
              The experiment will take you through the process of launching a web browser three times. It will also ask you some questions in between.</p>`,
  on_finish: function() {
      jsPsych.endExperiment(end_message);
      $.ajax({
          type: 'post',
          cache: false,
          url: 'datacollector/',
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
          headers: {
              'X-CSRFToken': '{{ csrf }}'
          },
          data: jsPsych.data.dataAsJSON(),
          success: function(output) { console.log(output); }
      });
  }
});
