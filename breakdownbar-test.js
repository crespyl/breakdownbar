requirejs.config({
    paths: {
        text: 'lib/text',
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
            width: (i*10)
        });
    }

    var bar = new BreakdownBar({
        parts: parts
    });

    $('.test').append(bar.render().$el);

    $('#randomize').on('click', function() {
        var remaining = 50 + (Math.random() * 50);
        for(var i in parts) {
            var p = parts[i];
            p.width = Math.random() * remaining;
            remaining -= p.width;
        }
        bar.render();
    });

    var parts2 = [];
    var colors = {
        15: 'red',
        25: 'yellow',
        40: 'green'
    };

    for(var i = 1; i <= 3; i++) {
        parts2.push({
            value: 50,
            width: function() {
                this.value = 10 + (Math.random() * 25);
                return this.value;
            },
            partClass: function() {
                var keys = Object.keys(colors);
                for(var i in keys) {
                    if(this.value <= keys[i]) {
                        return colors[keys[i]];
                    } else
                        continue;
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
