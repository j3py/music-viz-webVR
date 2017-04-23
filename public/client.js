// what is up
window.addEventListener('DOMContentLoaded', function() {
  // get audio node 
  var aNode = document.getElementById('audio');
  var box = document.getElementById('box');
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
  var source = audioCtx.createMediaElementSource(aNode);
  
  // hide controls for better experience on mobile
  aNode.addEventListener('play', function() {
    aNode.removeAttribute('controls');
    aNode.style.display = 'none';
  });
  
  // setup audio analyzer
  source.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = 32;
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);
  analyser.getByteTimeDomainData(dataArray);
  
  // method to return random int, inclusive
  function getRandInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // get new random track when one ends
  aNode.addEventListener('ended', function() {
    let trackNum = getRandInt(0,5);
    if (aNode.src === tracks[trackNum]) {
      trackNum = getRandInt(0,5);
    }
    aNode.src = tracks[trackNum];
  });

  // make changes to DOM, animate
  function draw() {
    requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);

    for (var i = 0; i < bufferLength; i++) {
      v = (dataArray[i] - 100.0) / 10.0;
    
      // found this hex code generator on stack overflow
      color = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});

      box.setAttribute('color', color);
      box.setAttribute('height', v);
      box.setAttribute('depth', v);
      box.setAttribute('width', v);
    }
  }
  draw();
});