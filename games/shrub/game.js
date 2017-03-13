var cycles = 1                         // how many iterations per stimulus for proper response averaging
var score = 0, accY = 100, accN = -50  // keeping score

// specify all stimuli and levels of related IVs (ps I sorta hate editing this, would rather see it in a spreadsheet?)
var video_clips = [
  {sources:["{{ gamestatic('vid/C_1_lag2.mp4') }}"],  data: [{first: 'Chrome',  clip: 1, speed: 'lag2',  correct: 'Firefox', correctKey: 74}]},
  {sources:["{{ gamestatic('vid/C_1_lag1.mp4') }}"],  data: [{first: 'Chrome',  clip: 1, speed: 'lag1',  correct: 'Firefox', correctKey: 74}]},
  {sources:["{{ gamestatic('vid/C_1_same.mp4') }}"],  data: [{first: 'Chrome',  clip: 1, speed: 'same',  correct: 'Same',    correctKey: 32}]},
  {sources:["{{ gamestatic('vid/C_1_lead1.mp4') }}"], data: [{first: 'Chrome',  clip: 1, speed: 'lead1', correct: 'Chrome',  correctKey: 70}]},
  {sources:["{{ gamestatic('vid/C_1_lead2.mp4') }}"], data: [{first: 'Chrome',  clip: 1, speed: 'lead2', correct: 'Chrome',  correctKey: 70}]},
  {sources:["{{ gamestatic('vid/C_2_lag2.mp4') }}"],  data: [{first: 'Chrome',  clip: 2, speed: 'lag2',  correct: 'Firefox', correctKey: 74}]},
  {sources:["{{ gamestatic('vid/C_2_lag1.mp4') }}"],  data: [{first: 'Chrome',  clip: 2, speed: 'lag1',  correct: 'Firefox', correctKey: 74}]},
  {sources:["{{ gamestatic('vid/C_2_same.mp4') }}"],  data: [{first: 'Chrome',  clip: 2, speed: 'same',  correct: 'Same',    correctKey: 32}]},
  {sources:["{{ gamestatic('vid/C_2_lead1.mp4') }}"], data: [{first: 'Chrome',  clip: 2, speed: 'lead1', correct: 'Chrome',  correctKey: 70}]},
  {sources:["{{ gamestatic('vid/C_2_lead2.mp4') }}"], data: [{first: 'Chrome',  clip: 2, speed: 'lead2', correct: 'Chrome',  correctKey: 70}]},
  {sources:["{{ gamestatic('vid/C_3_lag2.mp4') }}"],  data: [{first: 'Chrome',  clip: 3, speed: 'lag2',  correct: 'Firefox', correctKey: 74}]},
  {sources:["{{ gamestatic('vid/C_3_lag1.mp4') }}"],  data: [{first: 'Chrome',  clip: 3, speed: 'lag1',  correct: 'Firefox', correctKey: 74}]},
  {sources:["{{ gamestatic('vid/C_3_same.mp4') }}"],  data: [{first: 'Chrome',  clip: 3, speed: 'same',  correct: 'Same',    correctKey: 32}]},
  {sources:["{{ gamestatic('vid/C_3_lead1.mp4') }}"], data: [{first: 'Chrome',  clip: 3, speed: 'lead1', correct: 'Chrome',  correctKey: 70}]},
  {sources:["{{ gamestatic('vid/C_3_lead2.mp4') }}"], data: [{first: 'Chrome',  clip: 3, speed: 'lead2', correct: 'Chrome',  correctKey: 70}]},
  {sources:["{{ gamestatic('vid/C_4_lag2.mp4') }}"],  data: [{first: 'Chrome',  clip: 4, speed: 'lag2',  correct: 'Firefox', correctKey: 74}]},
  {sources:["{{ gamestatic('vid/C_4_lag1.mp4') }}"],  data: [{first: 'Chrome',  clip: 4, speed: 'lag1',  correct: 'Firefox', correctKey: 74}]},
  {sources:["{{ gamestatic('vid/C_4_same.mp4') }}"],  data: [{first: 'Chrome',  clip: 4, speed: 'same',  correct: 'Same',    correctKey: 32}]},
  {sources:["{{ gamestatic('vid/C_4_lead1.mp4') }}"], data: [{first: 'Chrome',  clip: 4, speed: 'lead1', correct: 'Chrome',  correctKey: 70}]},
  {sources:["{{ gamestatic('vid/C_4_lead2.mp4') }}"], data: [{first: 'Chrome',  clip: 4, speed: 'lead2', correct: 'Chrome',  correctKey: 70}]},
  {sources:["{{ gamestatic('vid/C_5_lag2.mp4') }}"],  data: [{first: 'Chrome',  clip: 5, speed: 'lag2',  correct: 'Firefox', correctKey: 74}]},
  {sources:["{{ gamestatic('vid/C_5_lag1.mp4') }}"],  data: [{first: 'Chrome',  clip: 5, speed: 'lag1',  correct: 'Firefox', correctKey: 74}]},
  {sources:["{{ gamestatic('vid/C_5_same.mp4') }}"],  data: [{first: 'Chrome',  clip: 5, speed: 'same',  correct: 'Same',    correctKey: 32}]},
  {sources:["{{ gamestatic('vid/C_5_lead1.mp4') }}"], data: [{first: 'Chrome',  clip: 5, speed: 'lead1', correct: 'Chrome',  correctKey: 70}]},
  {sources:["{{ gamestatic('vid/C_5_lead2.mp4') }}"], data: [{first: 'Chrome',  clip: 5, speed: 'lead2', correct: 'Chrome',  correctKey: 70}]},
  {sources:["{{ gamestatic('vid/F_1_lag2.mp4') }}"],  data: [{first: 'Firefox', clip: 1, speed: 'lag2',  correct: 'Chrome',  correctKey: 74}]},
  {sources:["{{ gamestatic('vid/F_1_lag1.mp4') }}"],  data: [{first: 'Firefox', clip: 1, speed: 'lag1',  correct: 'Chrome',  correctKey: 74}]},
  {sources:["{{ gamestatic('vid/F_1_same.mp4') }}"],  data: [{first: 'Firefox', clip: 1, speed: 'same',  correct: 'Same',    correctKey: 32}]},
  {sources:["{{ gamestatic('vid/F_1_lead1.mp4') }}"], data: [{first: 'Firefox', clip: 1, speed: 'lead1', correct: 'Firefox', correctKey: 70}]},
  {sources:["{{ gamestatic('vid/F_1_lead2.mp4') }}"], data: [{first: 'Firefox', clip: 1, speed: 'lead2', correct: 'Firefox', correctKey: 70}]},
  {sources:["{{ gamestatic('vid/F_2_lag2.mp4') }}"],  data: [{first: 'Firefox', clip: 2, speed: 'lag2',  correct: 'Chrome',  correctKey: 74}]},
  {sources:["{{ gamestatic('vid/F_2_lag1.mp4') }}"],  data: [{first: 'Firefox', clip: 2, speed: 'lag1',  correct: 'Chrome',  correctKey: 74}]},
  {sources:["{{ gamestatic('vid/F_2_same.mp4') }}"],  data: [{first: 'Firefox', clip: 2, speed: 'same',  correct: 'Same',    correctKey: 32}]},
  {sources:["{{ gamestatic('vid/F_2_lead1.mp4') }}"], data: [{first: 'Firefox', clip: 2, speed: 'lead1', correct: 'Firefox', correctKey: 70}]},
  {sources:["{{ gamestatic('vid/F_2_lead2.mp4') }}"], data: [{first: 'Firefox', clip: 2, speed: 'lead2', correct: 'Firefox', correctKey: 70}]},
  {sources:["{{ gamestatic('vid/F_3_lag2.mp4') }}"],  data: [{first: 'Firefox', clip: 3, speed: 'lag2',  correct: 'Chrome',  correctKey: 74}]},
  {sources:["{{ gamestatic('vid/F_3_lag1.mp4') }}"],  data: [{first: 'Firefox', clip: 3, speed: 'lag1',  correct: 'Chrome',  correctKey: 74}]},
  {sources:["{{ gamestatic('vid/F_3_same.mp4') }}"],  data: [{first: 'Firefox', clip: 3, speed: 'same',  correct: 'Same',    correctKey: 32}]},
  {sources:["{{ gamestatic('vid/F_3_lead1.mp4') }}"], data: [{first: 'Firefox', clip: 3, speed: 'lead1', correct: 'Firefox', correctKey: 70}]},
  {sources:["{{ gamestatic('vid/F_3_lead2.mp4') }}"], data: [{first: 'Firefox', clip: 3, speed: 'lead2', correct: 'Firefox', correctKey: 70}]},
  {sources:["{{ gamestatic('vid/F_4_lag2.mp4') }}"],  data: [{first: 'Firefox', clip: 4, speed: 'lag2',  correct: 'Chrome',  correctKey: 74}]},
  {sources:["{{ gamestatic('vid/F_4_lag1.mp4') }}"],  data: [{first: 'Firefox', clip: 4, speed: 'lag1',  correct: 'Chrome',  correctKey: 74}]},
  {sources:["{{ gamestatic('vid/F_4_same.mp4') }}"],  data: [{first: 'Firefox', clip: 4, speed: 'same',  correct: 'Same',    correctKey: 32}]},
  {sources:["{{ gamestatic('vid/F_4_lead1.mp4') }}"], data: [{first: 'Firefox', clip: 4, speed: 'lead1', correct: 'Firefox', correctKey: 70}]},
  {sources:["{{ gamestatic('vid/F_4_lead2.mp4') }}"], data: [{first: 'Firefox', clip: 4, speed: 'lead2', correct: 'Firefox', correctKey: 70}]},
  {sources:["{{ gamestatic('vid/F_5_lag2.mp4') }}"],  data: [{first: 'Firefox', clip: 5, speed: 'lag2',  correct: 'Chrome',  correctKey: 74}]},
  {sources:["{{ gamestatic('vid/F_5_lag1.mp4') }}"],  data: [{first: 'Firefox', clip: 5, speed: 'lag1',  correct: 'Chrome',  correctKey: 74}]},
  {sources:["{{ gamestatic('vid/F_5_same.mp4') }}"],  data: [{first: 'Firefox', clip: 5, speed: 'same',  correct: 'Same',    correctKey: 32}]},
  {sources:["{{ gamestatic('vid/F_5_lead1.mp4') }}"], data: [{first: 'Firefox', clip: 5, speed: 'lead1', correct: 'Firefox', correctKey: 70}]},
  {sources:["{{ gamestatic('vid/F_5_lead2.mp4') }}"], data: [{first: 'Firefox', clip: 5, speed: 'lead2', correct: 'Firefox', correctKey: 70}]} 
];
var all_trials = jsPsych.randomization.repeat(video_clips, cycles);  // specify here with 2nd arg how many repetitions of each trial

var timeline = [];                                                   // empty timeline .push all trials to it before .init to run study

var trials = all_trials.length*cycles;
var instructions_block = {
  type: 'instructions',
  pages: [   // "<p></p>",
    "<p>Welcome to Shrub - a \"BrainGame\"</p>" +
    "<p>BrainGames use research techniques from cognitive science<br>to better understand how our minds work when using the web</p>" +
    "<p>That understanding can improve web experiences by<br>tailoring them around data contributed through your participation</p>" +
    "<p>Left and right arrow keys navigate<br>back and forward through the instructions</p>",

    "<p>On each trial of this experiment you will see two video clips of<br>web pages loading back-to-back in <b>different browsers</b></p>" +
    "<p>Please pay close attention to how quickly the two pages load in the clips -<br>one browser <i>may</i> load the page more quickly than the other</p>",

    "<p><u>After</u> each pair of videos has played<br>you will be asked which clip, <i>if either,</i> loaded the page <b>fastest</b></p>" +
    "<p>The differences are very slight and can be difficult to notice</p>" +
    "<img src='{{ gamestatic('img/instAnswer.png') }}'></img>" +
    "<p><i>Sometimes</i> there is no difference, though<br>That option is <u>also</u> available to respond with</p>",
    
    "<p>Rest your index fingers on the 'F' and 'J' keys and your thumbs on the space bar</p>" +
    "<p>Press 'f' if the 1st clip loaded faster, 'j' if the 2nd clip loaded faster,<br>or space for the trials where the clips play at the same speed</p>" +
    "<img src='{{ gamestatic('img/instAnswer.png') }}'></img> " + " <img src='{{ gamestatic('img/keyhands.jpg') }}'></img>" + "<p>Key responses keep the trials moving along quickly</p>",

    "<p>Error tones are provided for feedback when your judgment is incorrect<br><strike>You are permitted a short practice block of trials before we begin keeping score</strike></p>" +
    "<p>There are a total of "+trials+" trials to capture enough data for us to draw conclusions<br>At "+accY+" points for an accurate trial and "+accN+" for an error, there is a total of "+trials*accY+" points possible</p>" +
    "<p>The experiment begins beyond this final instruction screen, you will not be able to go backward from here<br>Please do not exit fullscreen mode or we will not be able to use your data</p>"
  ]
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

// build trial timeline
for(i = 0; i < video_clips.length; i += 1){
// for(i = 0; i < 1; i += 1){ // 1 trial only DEBUG
  // timeline.push(fixation);
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
    type: 'single-stim',
  	stimulus: function(){
  		var first = jsPsych.data.get().last(1).values()[0][0].first
  		if(first == "Firefox") {
  			return "{{ gamestatic('img/FirefoxFirst.png') }}"
  		} else {
  			return "{{ gamestatic('img/ChromeFirst.png') }}"
  		}
  	},
    is_html: false,
    choices: [70, 32, 74],  // f, spacebar, and j - https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
    data: { correct_choice: all_trials[i].data[0].correctKey },
    on_finish: function(data) {
      // check accuracy
      jsPsych.data.addDataToLastTrial({ correct: data.key_press == data.correct_choice });
    }
  });
  // error tone feedback - sometimes the sound doesn't play and requires a keypress to advance; rebooting fixes it :(
  timeline.push({
    type: 'single-audio',
    stimulus: function(){
      var correct = jsPsych.data.get().last(1).values()[0].correct;
      if(correct){
        return "{{ gamestatic('wav/silence.mp3') }}"
      } else {
        return "{{ gamestatic('wav/buzzer.mp3') }}"   
      }
    },
    is_html: false,
    trial_ends_after_audio: true
  });
  timeline.push({
    type: 'single-stim',
    stimulus: function(){
      var correct = jsPsych.data.get().last(2).values()[0].correct;
      if(correct){
        score += accY
        jsPsych.data.addDataToLastTrial({ score: score });
        return "<p>Correct trial: Your score is now +"+accY+" = "+score+"</p>"   
      } else {
        score += accN
        jsPsych.data.addDataToLastTrial({ score: score });        
        return "<p>Incorrect trial: Your score is now "+accN+" = "+score+"</p>"   
      }
    },
    is_html: true,
    timing_response: 2000,
    choices: 'none'
  });
}

var debrief_block = {
  type: "text",
  text: "<p>The videos were edited strategically from the <b>same source</b> to be slower or faster on different trials</p>" +
        "<p>We're interested in knowing whether the browser you <i>thought</i> was loading the page affected how fast it <i>seemed</i> to you</p>" +
        "<br>" +
        "<p>At "+accY+" points for an accurate trial and "+accN+" for an error, out of a total of "+trials+" trials you scored "+score+" points</p>"  +
        "<p>Please press any key to conclude - thank you for your participation!</p>",
  timing_post_trial: 2000
};
timeline.push(debrief_block);

// generate a random subject ID
var subject_id = Math.floor(Math.random()*100000);
// if using heartbeat I'd want to use clientId here, grabbed as url var

// pick a random condition for the subject at the start of the experiment
// var condition_assignment = jsPsych.randomization.sample(['NewFx', 'MakersFx', 'NewBrowser'],1)[0];
// copy/pasted from docs, probably not the best way to reinforce quotas?

// record the condition assignment in the jsPsych data
// this adds a property called 'subject' and a property called 'condition' to every trial
jsPsych.data.addProperties({
  subject: subject_id
  // condition: condition_assignment
});

// arrays of files to be called at .init for preloading (if specified via callback)
var images = ["{{ gamestatic('img/ChromeFirst.png') }}", "{{ gamestatic('img/FirefoxFirst.png') }}"];
var sounds = ["{{ gamestatic('wav/silence.mp3') }}", "{{ gamestatic('wav/buzzer.mp3') }}"];

var csrf = "{% csrf_token %}";
jsPsych.init({
  timeline: timeline,
  fullscreen: true,
  show_progress_bar: true,
  preload_images: images,
  preload_audio: sounds,
  on_trial_start: function() {
    jsPsych.data.addDataToLastTrial({ trialStart: Date.now() })   // get timestamp
  },
  on_trial_finish: function() {
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