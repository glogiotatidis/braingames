
      var delay_options = [2000, 3000, 5000];
      var index = Math.floor(Math.random() * delay_options.length);
      var second_index = Math.floor(Math.random() * delay_options.length);
      var third_index = Math.floor(Math.random() * delay_options.length);

      var survey_question = {
        type: "survey-multi-choice",
        questions: ["How many seconds did it take for the Web Browser to launch?"],
        options: [[1, 2, 3, 4, 5, 6, 7, 8]],
        required: true,
        horizontal: true
      };

      /* randomize the delay and order of the versions. Add a survey question to each of them */
      var test_data = [
          {data: {version: 1, delay: delay_options[index]}, timeline: [{}, survey_question]},
          {data: {version: 2, delay: delay_options[second_index]}, timeline: [{}, survey_question]},
          {data: {version: Math.ceil(Math.random() * 2), delay: delay_options[third_index]}, timeline: [{}, survey_question]}
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
      jsPsych.init({
        timeline: timeline,
        fullscreen: true,
        on_finish: function() {
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
        }
      });