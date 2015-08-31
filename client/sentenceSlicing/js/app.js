



var text = 'I am a sentence slice me. No, for real slice me up. I am here to be sliced! Do you know what I mean?';

$(document).ready(function(){
	//createSentence(sentence, '#sentence');
	createText('#sentence', text);
});

var createText = function(renderPoint, text){
	
	var getSentences = function(text){
		//This will find all the . ? and ! and show the index of their locations
		var getIndex = function(text){
			var character = ['.','?','!'];
			var index = -1;
			_.each(character, function(element){
				var indexOf = text.indexOf(element);
				if(index > indexOf && indexOf !== -1 || index === -1) index = indexOf;
			});
			if(index === -1) index = text.length;
			return index;
		};
		//This will fill the array with the sliced up parts
		var array = [];
		while(text.length){
			var index = getIndex(text)+1;
			array.push(text.slice(0,index));
			text = text.slice(index,text.length);
		}

		return array;
	}
	var render = function(sentences){
		var renderSentences = function(sentences, renderPoint){
			_.each(sentences, function(sentence){
				var html = '<div class="sentence">';
				_.each(sentence.split(' '), function(element){
					html = html.concat(
						'<span class="word">',
							element,
						'</span>'
					);
				});
				html += '</div>';
				$(renderPoint).html($(renderPoint).html() + html);
				$( ".word" ).click(function() {
				  console.log('hit');
				});
			});
		}
		var renderAnswers = function(answers, renderPoint){
			var html = '';
			_.each(answers, function(element){
				html = html.concat(
				'<div>',
					'<span>',
						element,
					'</span>',
					'<input>',
					'<button id="removeSentence">X</button>',
				'</div>'
				);
			});
			$(renderPoint).html(html);
		}

		renderSentences(sentences, '.sentences');
		renderAnswers(['adlsfkj','adsf','hi there', 'what do you what'],'.answers');
	}

	$(renderPoint).html(''.concat(
		'<div class="paragraph">',
			'<div class="sentences">',
			'</div>',
			'<div class="answers">',
			'</div>',
		'</div>'
	));
	render(getSentences(text));
}