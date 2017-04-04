var cohort = jsPsych.currentTrial().data.version;

var launch_funcs = {
  '1': () => {
    setTimeout(function() {
        $('#l1').addClass('active');
        $('#w1').css({'opacity': '1'});
        setTimeout(function() {
            $('#s1').css({'opacity': '1'});
            setTimeout(function() {
                $('#t1').css({'opacity': '1'});
                setTimeout(function() {
                  $('#active-game').addClass('end');
                  setTimeout(function() {
                    $('#end-trial').click();
                    $('#active-game').removeClass('end');
                  }, 500);
                }, 2000);
            }, jsPsych.currentTrial().data.delay * (2/3));
        }, jsPsych.currentTrial().data.delay * (1/3));
    }, 200);
  },
  '2': () => {
    setTimeout(function() {
        $('#l1').addClass('active');
        setTimeout(function() {
            $('#w1').css({'opacity': '1'});
            $('#s1').css({'opacity': '1'});
            $('#t1').css({'opacity': '1'});
            setTimeout(function() {
              $('#active-game').addClass('end');
              setTimeout(function() {
                $('#end-trial').click();
                $('#active-game').removeClass('end');
              }, 500);
            }, 2000);
        }, jsPsych.currentTrial().data.delay);
    }, 200);
  }
}

$('#l1').on('click', launch_funcs[cohort]);
$('.desktop-icon').on('click', launch_funcs[cohort]);