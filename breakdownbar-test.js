requirejs.config({
	paths: {
		jquery: 'lib/jquery',
		underscore: 'lib/underscore'
	},
	shim: {
		underscore: {
			exports: '_'
		}
	}
});


define([
	'jquery',
	'breakdownbar'
], function($,BreakdownBar) {

	var parts = [];

	for(var i = 1; i <= 3; i++) {
		parts.push({
			progress: (i*10)
		});
	}

	var bar = new BreakdownBar({
		parts: parts
	});

	$('.test').append(bar.render().$el);

	$('#randomize').on('click', function() {
		for(var i in parts) {
			var p = parts[i];
			p.progress = Math.random() * 100;
		}
		bar.render();
	});

	var parts2 = [];
	var colors = {
		33: 'red',
		66: 'yellow',
		100: 'green'
	};

	for(var i = 1; i <= 3; i++) {
		parts2.push({
			value: 50,
			progress: function() {
				this.value = Math.random() * 100;
				return this.value;
			},
			attributes: {
				class: function() {
					var keys = Object.keys(colors);
					for(var i in keys) {
						if(this.value <= keys[i]) {
							return colors[keys[i]];
						} else
							continue;
					}
				}
			}
		});
	}

	var bar2 = new BreakdownBar({
		parts: parts2
	});

	$('.test2').append(bar2.render().$el);

	$('#randomize2').on('click', function() {
		bar2.render();
	});

});
