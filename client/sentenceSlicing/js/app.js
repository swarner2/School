



var sentence = 'I am a sentence slice me. No, for real slice me up. I am here to be sliced! Do you know what I mean?';

$(document).ready(function(){
	console.log('hit')
	placeSentenceInID(sentence, 'sentence');
});

var placeSentenceInID = function(sentence, destinationElement){
	var html = '<span class="sentence">';
	_.each(sentence.split(' '), function(element){
		html += '<span class="word">'+ element +'</span>';
	})
	html += '</span>';
	$("#" + destinationElement).html(html);
}


//----not finished
var textToSentences = function(text){
	var periodIndex = sentence.indexOf('.');
	var exclamationIndex = sentence.indexOf('!');
	var questionIndex = sentence.indexOf('?');
	//base case
	if(periodIndex === -1 && exclamationIndex === -1 && questionIndex === -1){
		return;
	}
}