var MIDI = require('midijs');
var fs = require('fs');

fs.readFile('midi/old_macdonald.mid', function(err, data) {
  if(err) {
    throw err;
  }

  var file = new MIDI.File(data, function(err) {
    if(err) {
      throw err;
    }
  });


  var numberOfTracks = file.getTracks().length;
  var melodyTrack = file.getTrack(1);
  var events = melodyTrack.getEvents();

  

  console.log("Number of tracks is " + numberOfTracks);
  console.log("Number of events is " + events.length);

  var notesArray = new Array();

  events.forEach(function(event) {
    if(event.type === MIDI.File.ChannelEvent.TYPE.NOTE_ON && event.velocity > 0) {
      notesArray.push(event.note);
    }
  });


  saveArray('out.mid', notesArray);

});

function saveArray(fileName, anArray) {
  var outFile = fs.createWriteStream("out/" + fileName);
  outFile.on('error', function(err) {
    throw err;
  });
  outFile.on('finish', function() {
    console.log("Done writing MIDI notes to file out/" + fileName); 
  });
  anArray.forEach(function(note) {
    outFile.write(note + ", ");
  });
  outFile.end();
} 
