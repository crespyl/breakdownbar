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

            var total = 0;

            for(var i in this.parts) {
                var p = this.parts[i];

                var partWidth = p.width instanceof Function ? p.width() : p.width;
                var partClass = this.opts.partClassName;
                if(p.partClass !== undefined)
                    partClass += ' ' + (p.partClass instanceof Function ? p.partClass() : p.partClass);

                total += partWidth;

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

                p.$el.css('width', partWidth + '%');
                p.$el.attr('class', partClass);
                p.label.text(partWidth.toFixed() + '%');
            }

            this.$label.css('left', (total/2)+'%').text(total.toFixed()+'%');

            return this;
        };
    };

    return BreakdownBar;
});
