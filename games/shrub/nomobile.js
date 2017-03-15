var timeline = [];

var debrief_block = {
  type: "text",
  text: "<p>Including mobile devices in our study could confound results<br>Please use a desktop or laptop computer</p>"
};
timeline.push(debrief_block);

// generate a random subject ID
var subject_id = Math.floor(Math.random()*100000);
var outcome_id = "mobile disqualification";
// if using heartbeat I'd want to use clientId here, grabbed as url var

// record the condition assignment in the jsPsych data
// this adds a property called 'subject' and a property called 'outcome' to every trial
jsPsych.data.addProperties({
  subject: subject_id,
  outcome: outcome_id
  // condition: condition_assignment
});

var csrf = "{% csrf_token %}";
jsPsych.init({
  timeline: timeline,
  on_trial_start: function() {
    jsPsych.data.addDataToLastTrial({ trialStart: Date.now() })   // get timestamp
  },
  on_trial_finish: function () {
    jsPsych.data.addDataToLastTrial({ trialFinish: Date.now() })  // get timestamp
  },
  // on_data_update: function(data){ console.log(JSON.stringify(data))},
  on_finish: function() {
    // jsPsych.data.displayData();
    $.ajax({
      type: 'post',
      cache: false,
      url: 'datacollector/',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: {
          'X-CSRFToken': '{{  csrf_token }}'
      },
      data: jsPsych.data.dataAsJSON(),
      success: function(output) { console.log(output); }
    });
  },
});