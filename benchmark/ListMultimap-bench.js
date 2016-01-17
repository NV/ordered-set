var PREHEAT_COUNT = 500;
var ITERATION_COUNT= 1000;


var suite = new Benchmark.Suite({
    teardown: function() {
        var observable = null;
    }
});


function ObservableArray() {
    this._listeners = [];
}

ObservableArray.prototype = {
    addEventListener: function(eventName, fn) {
        var listeners = this._listeners;
        for (var i = 0; i < listeners.length; i++) {
            var item = listeners[i];
            if (item.eventName === eventName && item.fn === fn) {
                return;
            }
        }

        listeners.push({eventName: eventName, fn: fn});
    }
};


function ObservableOrderedSet() {
    this._listeners = new ListMultimap();
}

ObservableOrderedSet.prototype = {
    addEventListener: function(eventName, fn) {
        this._listeners.add(fn, eventName);
    }
};



suite.add("ObservableArray", function() {
    for (var i = PREHEAT_COUNT; i < PREHEAT_COUNT + ITERATION_COUNT; i++) {
        observable.addEventListener(
            //i % 50 === 0 ? 42 : i,
            i,
            i % 2 === 0 ? foo : bar
        );
    }
}, {
    setup: function() {
        function foo() {return 42}
        function bar() {return 0}

        var observable = new ObservableArray;
        for (var i = 0; i < PREHEAT_COUNT; i++) {
            observable.addEventListener(
                //i % 50 === 0 ? 42 : i,
                i,
                i % 2 === 0 ? foo : bar
            );
        }
    }
});


suite.add("ObservableOrderedSet", function() {
    for (var i = PREHEAT_COUNT; i < PREHEAT_COUNT + ITERATION_COUNT; i++) {
        observable.addEventListener(
            //i % 50 === 0 ? 42 : i,
            i,
            i % 2 === 0 ? foo : bar
        );
    }
}, {
    setup: function() {
        function foo() {return 42}
        function bar() {return 0}

        var observable = new ObservableOrderedSet;
        for (var i = 0; i < PREHEAT_COUNT; i++) {
            observable.addEventListener(
                //i % 50 === 0 ? 42 : i,
                i,
                i % 2 === 0 ? foo : bar
            );
        }
    }
});


suite.on('cycle', function(event) {
    document.getElementById("results").innerHTML += "\n" + String(event.target);
})
.on('complete', function() {
    document.getElementById("results").innerHTML += "\n" + 'Fastest is ' + this.filter('fastest').map('name');
})
.run({'async': false});
