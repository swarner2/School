



var text = 'I am a sentence slice me; No, for real slice me up. I am here to be sliced! Do you know what I mean?';

$(document).ready(function(){
	//createSentence(sentence, '#sentence');
	createText('#field', text);
	-webkit-appearance: none;
});

var createText = function(renderPoint, text){

	var convertSentenceToWords= function(sentence, sentenceIndex){
		return _.map(sentence.split(' '),function(element, index){
			//Create The Tags and behavior of a single word
			return $().add(''.concat(
					"<span class='word'>",
						element,
					"</span>"
				)
			).click(function(){
				var answerStr = '';
				for (var i = 0; i <= index; i++) {
					answerStr += conText[sentenceIndex][i].text() + ' ';
				};
				addAnswer(answerStr);
			});
			//------------
		});
	};

	var addAnswer = function(text){
		var html = $().add(''.concat(
				'<div class="answer">',
					'<span class="text">',
						text,
					'</span>',
					'<div class="input">',
						'<button onclick="createText.removeSentence('+answers.length+')" id="removeSentence">X</button>',
						'<input>',
					'</div>',
				'</div>'
			)
		);
		answers.push(html);
		render();
	}
	createText.removeSentence = function(id){
		undo.push([id,answers[id]]);
		answers[id] = undefined;
		render();
	}
	var render = function(){
		if(!render.init){
			render.init = true;
			$(renderPoint).html(''.concat(
				'<div class="paragraph">',
					'<button class="mainBtn undo">Undo</button>',
					'<button class="mainBtn finished">Finished</button>',
					'<div class="sentences">',
					'</div>',
					'<div class="answers">',
					'</div>',
				'</div>'
			));

			//controller for the finish btn
			$(renderPoint).children('div').children('.finished').click(function(){
				var finished = {
					text : text,
					answers : _.map(answers, function(element){
						if(element) return [ element.children('.text').text(), element.children('.input').children('input').val()];
					})
				};

				window.prompt("Copy to clipboard then submit it to the teacher:", JSON.stringify(finished));
			})

			//controller for the undo btn
			$(renderPoint).children('div').children('.undo').click(function(){
				var val = undo.pop();
				answers[val[0]] = val[1];
				render();
			})
		}
		_.each(conText, function(element){
			_.each(element, function(element){
				$('.sentences').append(element);
				$('.sentences').append(' ');
			});
		});
		$('.answers').html('');
		_.each(answers, function(element){
			$('.answers').append(element);
		});
	};


	conText = [];
	var answers = [];
	var undo = [];
	//slice the text into sentences
	var textBackup = text;
	while(textBackup.length){
		var index = textBackup.search(/[.!?]/)+1;
		conText.push(textBackup.slice(0,index));
		textBackup = textBackup.slice(index,textBackup.length);
	}
	//slice each sentence into words
	conText = _.map(conText, function(element,index){
		return convertSentenceToWords(element,index);
	});

	render();

}