// gotta find a way to inhibit using backspace and aborting/redoing experiment or at least penalizing/disqualifying for it
// gotta find a way to inhibit undoing fullscreen or at least penalizing/disqualifying for it

var timeline = [];

var welcome_block = {
type: "text",
text: "<p>Welcome to Shrub - a \"BrainGame\".</p>" +
      '<p>BrainGames use research techniques from cognitive science to understand how people\'s minds work when using the web.</p>' +
      '<p>That understanding can help provide the best quality browser experience possible, tailored around data contributed through your participation.</p>' +
      "<p>Please press any key to begin.</p>"
};
timeline.push(welcome_block);

var instructions_block = {
type: "text",
text: "<p>On each trial of this experiment you will see videos of web pages loading back-to-back in two different browsers.</p>" +
      "<p>Please pay close attention to how quickly the two pages load - one browser <i>may</i> load the page more quickly than the other.</p>" +
      "<p>After each pair of videos has played, please click one of three buttons indicating which browser, <i>if either,</i> loaded the page fastest - OR that there was no difference.</p>" +
      "<p>Error tones are provided for feedback when your judgment is incorrect. You are permitted a short practice block of trials before we begin keeping score.</p>" +
      "<p>There are a total of 50 trials. At 100 points for an accurate trial and -50 for an error, there is a total of 5000 points possible.</p>",
timing_post_trial: 2000
};
timeline.push(instructions_block);

// static fixation cross
// (may not end up using in timeline)
var fixation = {
type: 'single-stim',
stimulus: "{{ gamestatic('img/fixation.png') }}",
timing_stim: 500,
timing_response: 500,
choices: 'none'
};

// specify all stimuli and levels of related IVs
// TODO how to preload video files and still pass relative paths that jsPsych expects?
// ps I sorta hate editing this, would rather see it in a spreadsheet?
var video_clips = [
{sources:["{{ gamestatic('vid/C_1_lag2.mp4') }}"],  data: [{first: 'Chrome',  clip: 1, speed: 'lag2',  correct: 'Firefox', correctButton: '2'}]},
{sources:["{{ gamestatic('vid/C_1_lag1.mp4') }}"],  data: [{first: 'Chrome',  clip: 1, speed: 'lag1',  correct: 'Firefox', correctButton: '2'}]},
{sources:["{{ gamestatic('vid/C_1_same.mp4') }}"],  data: [{first: 'Chrome',  clip: 1, speed: 'same',  correct: 'Same',    correctButton: '1'}]},
{sources:["{{ gamestatic('vid/C_1_lead1.mp4') }}"], data: [{first: 'Chrome',  clip: 1, speed: 'lead1', correct: 'Chrome',  correctButton: '0'}]},
{sources:["{{ gamestatic('vid/C_1_lead2.mp4') }}"], data: [{first: 'Chrome',  clip: 1, speed: 'lead2', correct: 'Chrome',  correctButton: '0'}]},
{sources:["{{ gamestatic('vid/C_2_lag2.mp4') }}"],  data: [{first: 'Chrome',  clip: 2, speed: 'lag2',  correct: 'Firefox', correctButton: '2'}]},
{sources:["{{ gamestatic('vid/C_2_lag1.mp4') }}"],  data: [{first: 'Chrome',  clip: 2, speed: 'lag1',  correct: 'Firefox', correctButton: '2'}]},
{sources:["{{ gamestatic('vid/C_2_same.mp4') }}"],  data: [{first: 'Chrome',  clip: 2, speed: 'same',  correct: 'Same',    correctButton: '1'}]},
{sources:["{{ gamestatic('vid/C_2_lead1.mp4') }}"], data: [{first: 'Chrome',  clip: 2, speed: 'lead1', correct: 'Chrome',  correctButton: '0'}]},
{sources:["{{ gamestatic('vid/C_2_lead2.mp4') }}"], data: [{first: 'Chrome',  clip: 2, speed: 'lead2', correct: 'Chrome',  correctButton: '0'}]},
{sources:["{{ gamestatic('vid/C_3_lag2.mp4') }}"],  data: [{first: 'Chrome',  clip: 3, speed: 'lag2',  correct: 'Firefox', correctButton: '2'}]},
{sources:["{{ gamestatic('vid/C_3_lag1.mp4') }}"],  data: [{first: 'Chrome',  clip: 3, speed: 'lag1',  correct: 'Firefox', correctButton: '2'}]},
{sources:["{{ gamestatic('vid/C_3_same.mp4') }}"],  data: [{first: 'Chrome',  clip: 3, speed: 'same',  correct: 'Same',    correctButton: '1'}]},
{sources:["{{ gamestatic('vid/C_3_lead1.mp4') }}"], data: [{first: 'Chrome',  clip: 3, speed: 'lead1', correct: 'Chrome',  correctButton: '0'}]},
{sources:["{{ gamestatic('vid/C_3_lead2.mp4') }}"], data: [{first: 'Chrome',  clip: 3, speed: 'lead2', correct: 'Chrome',  correctButton: '0'}]},
{sources:["{{ gamestatic('vid/C_4_lag2.mp4') }}"],  data: [{first: 'Chrome',  clip: 4, speed: 'lag2',  correct: 'Firefox', correctButton: '2'}]},
{sources:["{{ gamestatic('vid/C_4_lag1.mp4') }}"],  data: [{first: 'Chrome',  clip: 4, speed: 'lag1',  correct: 'Firefox', correctButton: '2'}]},
{sources:["{{ gamestatic('vid/C_4_same.mp4') }}"],  data: [{first: 'Chrome',  clip: 4, speed: 'same',  correct: 'Same',    correctButton: '1'}]},
{sources:["{{ gamestatic('vid/C_4_lead1.mp4') }}"], data: [{first: 'Chrome',  clip: 4, speed: 'lead1', correct: 'Chrome',  correctButton: '0'}]},
{sources:["{{ gamestatic('vid/C_4_lead2.mp4') }}"], data: [{first: 'Chrome',  clip: 4, speed: 'lead2', correct: 'Chrome',  correctButton: '0'}]},
{sources:["{{ gamestatic('vid/C_5_lag2.mp4') }}"],  data: [{first: 'Chrome',  clip: 5, speed: 'lag2',  correct: 'Firefox', correctButton: '2'}]},
{sources:["{{ gamestatic('vid/C_5_lag1.mp4') }}"],  data: [{first: 'Chrome',  clip: 5, speed: 'lag1',  correct: 'Firefox', correctButton: '2'}]},
{sources:["{{ gamestatic('vid/C_5_same.mp4') }}"],  data: [{first: 'Chrome',  clip: 5, speed: 'same',  correct: 'Same',    correctButton: '1'}]},
{sources:["{{ gamestatic('vid/C_5_lead1.mp4') }}"], data: [{first: 'Chrome',  clip: 5, speed: 'lead1', correct: 'Chrome',  correctButton: '0'}]},
{sources:["{{ gamestatic('vid/C_5_lead2.mp4') }}"], data: [{first: 'Chrome',  clip: 5, speed: 'lead2', correct: 'Chrome',  correctButton: '0'}]},
{sources:["{{ gamestatic('vid/F_1_lag2.mp4') }}"],  data: [{first: 'Firefox', clip: 1, speed: 'lag2',  correct: 'Chrome',  correctButton: '2'}]},
{sources:["{{ gamestatic('vid/F_1_lag1.mp4') }}"],  data: [{first: 'Firefox', clip: 1, speed: 'lag1',  correct: 'Chrome',  correctButton: '2'}]},
{sources:["{{ gamestatic('vid/F_1_same.mp4') }}"],  data: [{first: 'Firefox', clip: 1, speed: 'same',  correct: 'Same',    correctButton: '1'}]},
{sources:["{{ gamestatic('vid/F_1_lead1.mp4') }}"], data: [{first: 'Firefox', clip: 1, speed: 'lead1', correct: 'Firefox', correctButton: '0'}]},
{sources:["{{ gamestatic('vid/F_1_lead2.mp4') }}"], data: [{first: 'Firefox', clip: 1, speed: 'lead2', correct: 'Firefox', correctButton: '0'}]},
{sources:["{{ gamestatic('vid/F_2_lag2.mp4') }}"],  data: [{first: 'Firefox', clip: 2, speed: 'lag2',  correct: 'Chrome',  correctButton: '2'}]},
{sources:["{{ gamestatic('vid/F_2_lag1.mp4') }}"],  data: [{first: 'Firefox', clip: 2, speed: 'lag1',  correct: 'Chrome',  correctButton: '2'}]},
{sources:["{{ gamestatic('vid/F_2_same.mp4') }}"],  data: [{first: 'Firefox', clip: 2, speed: 'same',  correct: 'Same',    correctButton: '1'}]},
{sources:["{{ gamestatic('vid/F_2_lead1.mp4') }}"], data: [{first: 'Firefox', clip: 2, speed: 'lead1', correct: 'Firefox', correctButton: '0'}]},
{sources:["{{ gamestatic('vid/F_2_lead2.mp4') }}"], data: [{first: 'Firefox', clip: 2, speed: 'lead2', correct: 'Firefox', correctButton: '0'}]},
{sources:["{{ gamestatic('vid/F_3_lag2.mp4') }}"],  data: [{first: 'Firefox', clip: 3, speed: 'lag2',  correct: 'Chrome',  correctButton: '2'}]},
{sources:["{{ gamestatic('vid/F_3_lag1.mp4') }}"],  data: [{first: 'Firefox', clip: 3, speed: 'lag1',  correct: 'Chrome',  correctButton: '2'}]},
{sources:["{{ gamestatic('vid/F_3_same.mp4') }}"],  data: [{first: 'Firefox', clip: 3, speed: 'same',  correct: 'Same',    correctButton: '1'}]},
{sources:["{{ gamestatic('vid/F_3_lead1.mp4') }}"], data: [{first: 'Firefox', clip: 3, speed: 'lead1', correct: 'Firefox', correctButton: '0'}]},
{sources:["{{ gamestatic('vid/F_3_lead2.mp4') }}"], data: [{first: 'Firefox', clip: 3, speed: 'lead2', correct: 'Firefox', correctButton: '0'}]},
{sources:["{{ gamestatic('vid/F_4_lag2.mp4') }}"],  data: [{first: 'Firefox', clip: 4, speed: 'lag2',  correct: 'Chrome',  correctButton: '2'}]},
{sources:["{{ gamestatic('vid/F_4_lag1.mp4') }}"],  data: [{first: 'Firefox', clip: 4, speed: 'lag1',  correct: 'Chrome',  correctButton: '2'}]},
{sources:["{{ gamestatic('vid/F_4_same.mp4') }}"],  data: [{first: 'Firefox', clip: 4, speed: 'same',  correct: 'Same',    correctButton: '1'}]},
{sources:["{{ gamestatic('vid/F_4_lead1.mp4') }}"], data: [{first: 'Firefox', clip: 4, speed: 'lead1', correct: 'Firefox', correctButton: '0'}]},
{sources:["{{ gamestatic('vid/F_4_lead2.mp4') }}"], data: [{first: 'Firefox', clip: 4, speed: 'lead2', correct: 'Firefox', correctButton: '0'}]},
{sources:["{{ gamestatic('vid/F_5_lag2.mp4') }}"],  data: [{first: 'Firefox', clip: 5, speed: 'lag2',  correct: 'Chrome',  correctButton: '2'}]},
{sources:["{{ gamestatic('vid/F_5_lag1.mp4') }}"],  data: [{first: 'Firefox', clip: 5, speed: 'lag1',  correct: 'Chrome',  correctButton: '2'}]},
{sources:["{{ gamestatic('vid/F_5_same.mp4') }}"],  data: [{first: 'Firefox', clip: 5, speed: 'same',  correct: 'Same',    correctButton: '1'}]},
{sources:["{{ gamestatic('vid/F_5_lead1.mp4') }}"], data: [{first: 'Firefox', clip: 5, speed: 'lead1', correct: 'Firefox', correctButton: '0'}]},
{sources:["{{ gamestatic('vid/F_5_lead2.mp4') }}"], data: [{first: 'Firefox', clip: 5, speed: 'lead2', correct: 'Firefox', correctButton: '0'}]}
];
// specify here with 2nd arg how many repetitions of each trial
var all_trials = jsPsych.randomization.repeat(video_clips, 1);

// build  master timeline
for(i=0; i<video_clips.length; i+=1){
//    timeline.push(fixation);
// video trial to display stimuli
timeline.push({
  type: 'video',
  autoplay: true,
  controls: false,
  timing_post_trial: 0,
  center_vertical: true,
  sources: all_trials[i].sources,
  data: all_trials[i].data
});
// button-response trial to collect responses
timeline.push({
  type: 'button-response',
	stimulus: function(){
		var first = jsPsych.data.get().last(1).values()[0].first
		console.log(first)
		if (first == "Firefox") {
			return "{{ gamestatic('img/FirefoxFirst.png')}}"
		} else {
			return "{{ gamestatic('img/ChromeFirst.png')}}"
		}
	},
  prompt: '<p>Which clip, if either, had a faster page-load?</p>',
  is_html: false,
  choices: ['The first clip.', 'Both clips were the same speed.', 'The second clip.'],
  timing_post_trial: 0,
  data: { correct_choice: all_trials[i].data[0].correctButton },
  on_finish: function(data) {
    // check accuracy
    jsPsych.data.addDataToLastTrial({ correct: data.button_pressed == data.correct_choice })
    console.log("correct: "+data.correct)
    // tally points
  }
});
// error tone feedback
timeline.push({
  type: 'single-audio',
  stimuli: function(){
    var correct = jsPsych.data.get().last(1).values()[0].correct
    console.log(correct)
    // ^this line returns nothing despite this being the form in the docs WTFFFFFFFFFF
    if(correct){
      console.log('correct response')
      return "{{ gamestatic('wav/buzzer.wav') }}"
    } else {
      console.log('incorrect response')
      return "{{ gamestatic('wav/buzzer.wav') }}"
    }
  },
  is_html: true,
  timing_response: 500,
  response_ends_trial: false
});
}
// // generate a random subject ID
// var subject_id = Math.floor(Math.random()*100000);
// // if using heartbeat I'd want to use clientId here, grabbed as url var

// // pick a random condition for the subject at the start of the experiment
// var condition_assignment = jsPsych.randomization.sample(['NewFx', 'MakersFx', 'NewBrowser'],1)[0];
// // copy/pasted from docs, probably not the best way to reinforce quotas?

// // record the condition assignment in the jsPsych data
// // this adds a property called 'subject' and a property called 'condition' to every trial
// jsPsych.data.addProperties({
// subject: subject_id,
// condition: condition_assignment
// });

var csrf = "{% csrf_token %}";
jsPsych.init({
  timeline: timeline,
  fullscreen: true,
  show_progress_bar: true,
  on_trial_start: function() {
    // get timestamp
    jsPsych.data.addDataToLastTrial({ trialStart: Date.now() })
    //      console.log("correct: "+data.trialStart)
  },
  on_trial_finish: function () {
    // get timestamp
    jsPsych.data.addDataToLastTrial({ trialFinish: Date.now() })
    //      console.log("correct: "+data.trialFinish)
  },

  // on_data_update: function(data){ console.log(JSON.stringify(data))},
  on_finish: function() {
    jsPsych.data.displayData();
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
