var Poker = (function () {
  var round = 1,
      duration = 900,
      timer = duration,
      blinds = [{
        small: "$100/",
        big: "$100",
		ante: "",
		duration: 900
      }, {
        small: "$100/",
        big: "$100/",
		ante: "$100",
		duration: 900
      }, {
        small: "$100/",
        big: "$200/",
		ante: "$200",
		duration: 900
      }, {
        small: "$200/",
        big: "$400/",
		ante: "$400",
		duration: 900
      }, {
        small: "$300/",
        big: "$600/",
		ante: "$600",
		duration: 900
      }, {
        small: "$400/",
        big: "$800/",
		ante: "$800",
		duration: 900
      }, {
        small: "Break",
        big: "",
		ante: "",
		duration: 420
      }, {
        small: "$600/",
        big: "$1,200/",
		ante: "$1,200",
		duration: 1200
      }, {
        small: "$800/",
        big: "$1,600/",
		ante: "$1,600",
		duration: 1200
      }, {
        small: "$1,000/",
        big: "$2,000/",
		ante: "$2,000",
		duration: 1200
      }, {
        small: "$2,000/",
        big: "$4,000/",
		ante: "$4,000",
		duration: 1200
      }, {
        small: "$3,000/",
        big: "$6,000/",
		ante: "$6,000",
		duration: 1200
      }, {
        small: "$4,000/",
        big: "$8,000/",
		ante: "$8,000",
		duration: 1200
      }, {
        small: "$5,000/",
        big: "$10,000/",
		ante: "$10,000",
		duration: 1200
      }, {
        small: "$6,000/",
        big: "$12,000/",
		ante: "$12,000",
		duration: 1200
      }, {
        small: "$7,000/",
        big: "$14,000/",
		ante: "$14,000",
		duration: 1200
      }, {
        small: "$8,000/",
        big: "$16,000/",
		ante: "$16,000",
		duration: 1200
      }, {
        small: "$9,000/",
        big: "$18,000/",
		ante: "$18,000",
		duration: 1200
      }, {
        small: "$10,000/",
        big: "$20,000/",
		ante: "$20,000",
		duration: 1200
      }, {
        small: "$12,000/",
        big: "$24,000/",
		ante: "$24,000",
		duration: 1200
      }],
      interval_id;
  
  return {
    isGamePaused: function () {
      return !interval_id ? true : false;
    },
    playAlarm: function () {
      $('#alarm')[0].play();
    },
    reset: function () {
      // reset timer
      this.resetTimer();
      
      this.stopClock();
      
      this.updateClock(timer);
      
      // reset play/pause button
      this.updatePlayPauseButton();
      
      // reset round
      round = 1;
      
      this.updateRound(round);
      
      // increase blinds
      this.updateBlinds(round);
    },
    resetTimer: function () {
      timer = duration;
    },
    startClock: function () {
      var that = this;
      
      interval_id = setInterval(function () {
        that.updateClock(timer);
        
        timer -= 1;
      }, 1000);
    },
    startNextRound: function () {
		
      // reset timer
      this.resetTimer();
      
      this.stopClock();
	  	  
	  var round_blinds = blinds[round] || blinds[blinds.length];
	  
      timer = round_blinds.duration;
      
      this.updateClock(timer);
      
      // reset play/pause button
      this.updatePlayPauseButton();
	  
	  var pause_play_button = $('#poker_play_pause a');
	  pause_play_button.removeClass('play');
        pause_play_button.addClass('pause');
      
      // increase round
      round += 1;
      
      this.updateRound(round);
      
      // increase blinds
      this.updateBlinds(round);
    },
	goBackRound: function () {
      // reset timer
      this.resetTimer();
      
      this.stopClock();
	  	  
	  var round_blinds = blinds[round-1] || blinds[blinds.length];
	  
      timer = round_blinds.duration;
      
      this.updateClock(timer);
      
      // reset play/pause button
      this.updatePlayPauseButton();
      
      // increase round
      round -= 1;
      
      this.updateRound(round);
      
      // increase blinds
      this.updateBlinds(round);
    },
    stopClock: function () {
      clearInterval(interval_id);
      interval_id = undefined;
    },
    updateBlinds: function (round) {
      var round_blinds = blinds[round - 1] || blinds[blinds.length];
      
      $('.small-blind').html(round_blinds.small);
      $('.big-blind').html(round_blinds.big);
	  $('.ante-blind').html(round_blinds.ante);
    },
    updateClock: function (timer) {
	  var round_blinds = blinds[round - 1] || blinds[blinds.length];

      var minute = Math.floor(timer / 60),
          second = (timer % 60) + "",
          second = second.length > 1 ? second : "0" + second;
        
      $('.clock').html(minute + ":" + second);
      
      if (timer <= 0) {
        this.startNextRound();
        
        this.playAlarm();
        
        this.startClock();
        
        // update play/pause button
        this.updatePlayPauseButton();
      }
    },
    updatePlayPauseButton: function () {
      var pause_play_button = $('#poker_play_pause a');
      
      if (this.isGamePaused()) {
        pause_play_button.removeClass('pause');
        pause_play_button.addClass('play');
      } else {
        pause_play_button.removeClass('play');
        pause_play_button.addClass('pause');
      }
    },
    updateRound: function (round) {
      $('#round').html('Round' + ' ' + round);
    }
  };
}());

$('#poker_play_pause').on('click', function (event) {
  if (Poker.isGamePaused()) {
    Poker.startClock();
  } else {
    Poker.stopClock();
  }
  
  // update play/pause button
  Poker.updatePlayPauseButton();
});

$('#poker_next_round').on('click', function (event) {
  Poker.startNextRound();
  Poker.startClock();
});

$('#poker_back_round').on('click', function (event) {
  Poker.goBackRound();
  Poker.startClock();
});

$('body').on('keypress', function (event) {
  if (Poker.isGamePaused()) {
    Poker.startClock();
  } else {
    Poker.stopClock();
  }
  
  // update play/pause button
  Poker.updatePlayPauseButton();
});


$('.reset').on('click', function (event) {
  Poker.reset();
});
