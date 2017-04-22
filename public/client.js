// what is up
window.addEventListener('DOMContentLoaded', function() {
  var stream = document.getElementById('audio');
  stream.addEventListener('play', function() {
    stream.removeAttribute('controls');
    stream.style.display = 'none';
  });
  var sphere = document.getElementById('sphere');
  var vrscene = document.querySelector('a-scene');
  var colors = [
      "#FD242A",
      "#18A7A2",
      "#FF8524",
      "#27D41E"
    ];
  var tracks = [
    "/01 Title Theme.mp3",
    "/01 stage 1.mp3",
    "/02-Green Hill Zone.mp3",
    "/04 bloody tears.mp3",
    "/05 night.mp3",
    "/17_-_wily_stage_1-2.mp3"
  ];
  var color, rad, v;
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var analyser = audioCtx.createAnalyser();
  var source = audioCtx.createMediaElementSource(stream);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);

  analyser.fftSize = 32;
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);
  analyser.getByteTimeDomainData(dataArray);
  
//  function getRandInt(min, max) {
//    min = Math.ceil(min);
//    max = Math.floor(max);
//    return Math.floor(Math.random() * (max - min + 1)) + min;
//  }
//  
//  function getRandNum(min, max) {
//    return Math.random() * (max - min + 1) + min;
//  }
  
  stream.addEventListener('ended', function() {
    let trackNum = getRandInt(0,5);
    if (stream.src === tracks[trackNum]) {
      trackNum = getRandInt(0,5);
    }
    stream.src = tracks[trackNum];
  });

  function draw() {
    requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);

    for (var i = 0; i < bufferLength; i++) {
      v = (dataArray[i] - 100.0) / 10.0;
    
//        var sphere = document.createElement('a-sphere');
//        var pos = { 
//          x: getRandInt(-10, 10), 
//          y: getRandInt(-10, 10),
//          z: getRandInt(-10, 10)
//        };
      color = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
//        sphere.setAttribute('position', pos);
      box.setAttribute('color', color);
      box.setAttribute('height', v);
      box.setAttribute('depth', v);
      box.setAttribute('width', v);
    }
  }
  draw();
//  setInterval(draw, 100);
  
//  // draw an oscilloscope of the current audio source
//  // Get a canvas defined with ID "oscilloscope"
//  var canvas = document.getElementById("oscilloscope");
//  var canvasCtx = canvas.getContext("2d");
//
//  // draw an oscilloscope of the current audio source
//
//  function draw() {
//
//    drawVisual = requestAnimationFrame(draw);
//
//    analyser.getByteTimeDomainData(dataArray);
//
//    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
//    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
//
//    canvasCtx.lineWidth = 2;
//    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
//
//    canvasCtx.beginPath();
//
//    var sliceWidth = canvas.width * 1.0 / bufferLength;
//    var x = 0;
//
//    for (var i = 0; i < bufferLength; i++) {
//
//      var v = dataArray[i] / 128.0;
//      var y = v * canvas.height / 2;
//
//      if (i === 0) {
//        canvasCtx.moveTo(x, y);
//      } else {
//        canvasCtx.lineTo(x, y);
//      }
//
//      x += sliceWidth;
//    }
//
//    canvasCtx.lineTo(canvas.width, canvas.height / 2);
//    canvasCtx.stroke();
//  };
//
//  draw();
});