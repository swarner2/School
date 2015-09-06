

var text = decodeURI(window.location.search).slice(1);
if(text.length === 0)  text = 'Error while loading URI code.';
var conText = [];
var textBackup = text;
var answers = [];
var undo = [];
var renderPoint = '#field';


var convertSentenceToWords= function(sentence, sentenceIndex){
	return _.map(sentence.split(' '),function(element, index){
		//Create The Tags and behavior of a single word
		var word = []; 
		word[0] = $().add(''.concat(
				"<span class='word'>",
					element,
				"</span>"
			)
		).click(function(){
			var answerStr = '';
			for (var wordIndex = 0; wordIndex <= index; wordIndex++) {
				if(wordIndex===index)
					word[1] = true;
				answerStr += conText[sentenceIndex][wordIndex][0].text() + ' ';
			};
			addAnswer(answerStr,sentenceIndex, wordIndex);
		});
		word[1] = false;
		return word;
		//------------
	});
};
//slice the text into sentences
var sliceText = function(){
	while(textBackup.length){
		var index = textBackup.search(/[.!?]/);
		if(index === -1) {	
			index = textBackup.length-1;
		}
		index++;
		conText.push(textBackup.slice(0,index));
		textBackup = textBackup.slice(index,textBackup.length);
	}
	//slice each sentence into words
	conText = _.map(conText, function(element,index){
		return convertSentenceToWords(element,index);
	});
}

var removeSentence = function(id){
	undo.push([id,answers[id]]);
	answers[id] = undefined;
	render();
}


sliceText();
render();
