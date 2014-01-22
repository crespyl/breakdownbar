define([
	'underscore',
	'jquery'
], function(_,$,template) {

	var BreakdownBar = function(opts) {
		this.opts = _.defaults(opts, {
			parts: [],

			tagName: 'div',
			className: 'breakdownbar-container',

			partTagName: 'div',
			partClassName: 'breakdownbar-part',

			labelTagName: 'div',
			labelClassName: 'breakdownbar-label',

			hidePartsBelow: 5,

			popoverOpts: {
				trigger: 'hover',
				placement: 'bottom',
				container: 'body',

				html: true,
				title: undefined,
				content: undefined
			},

			$el: undefined
		});

		this.parts = this.opts.parts;

		this.render = function() {
			if(this.$el === undefined) {
				this.$el = $('<'+this.opts.tagName+'></'+this.opts.tagName+'>');
				this.$el.addClass(this.opts.className);

				this.$label = $('<'+this.opts.labelTagName+'></'+this.opts.labelTagName+'>');
				this.$label.addClass(this.opts.labelClassName);
				this.$el.append(this.$label);
			}

			var totalWeight = 0;
			var totalProgress = 0;

			for(var i in this.parts) {
				var p = this.parts[i];
				if(p.weight === undefined)
					p.weight = 1;
				totalWeight += parseInt(_.result(p, 'weight'));
			}

			for(var i in this.parts) {
				var p = this.parts[i];

				var partClass = this.opts.partClassName;
				var partWeight = parseInt(_.result(p, 'weight'));
				var partProgress = parseInt(_.result(p, 'progress'));

				var partAttributes = _.result(p, 'attributes');

				var width = (partWeight / totalWeight) * partProgress;
				totalProgress += width;

				if(p.uid === undefined) {
					p.uid = _.uniqueId('breakdownbar-part-');
				}

				if(p.$el === undefined) {
					p.$el = $('<'+this.opts.partTagName+'></'+this.opts.partTagName+'>');
					p.$el.attr('id', p.uid);

					p.label = $('<'+this.opts.labelTagName+'></'+this.opts.labelTagName+'>');
					p.label.addClass(this.opts.labelClassName);
					p.$el.append(p.label);

					this.$el.prepend(p.$el);
				}


				if(partAttributes !== undefined) {
					_.keys(partAttributes).forEach(function(attribute) {
						var value = partAttributes[attribute];
						if( value instanceof Function )
							value = value.apply(p);
						p.$el.attr(attribute, value);

						if(attribute === "class")
							partClass += ' '+value;
					});
				}

				//optional support for Bootstrap popovers
				//requires Bootstrap tooltip and popover js, as well as relevant css
				if(p.popover !== undefined) {
					var popoverOpts = this.opts.popoverOpts;
					var popover = _.result(p, 'popover');
					_.keys(popover).forEach(function(key) {
						popoverOpts[key] = popover[key];
					});
					p.$el.popover(popoverOpts);
				}

				p.$el.attr('class', partClass);

				width = parseInt(width.toFixed());
				p.$el.css('width', width + '%');
				p.label.text(partProgress.toFixed() + '%');

				if( width < this.opts.hidePartsBelow ) {
					p.$el.css('display: none');
					p.$el.addClass('hide');
				}
				else {
					p.$el.css('display: inline-block');
					p.$el.removeClass('hide');
				}
			}

			this.$label.css('left', (totalProgress/2)+'%').text(totalProgress.toFixed()+'%');

			return this;
		};
	};

	return BreakdownBar;
});
