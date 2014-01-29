ig.module(
    'plugins.midas.arrayutils'
)
.requires(
    'impact.impact'
)
.defines(function() {
PluginArrayUtils = function() {
    this.shuffle = function(obj) {
        var rand;
        var index = 0;
        var shuffled = [];
        this.each(obj, function(value) {
            rand = Math.floor(Math.random() * index);
            shuffled[index] = shuffled[rand];
            index++;
            shuffled[rand] = value;
        });
        return shuffled;
    };
    this.each = function(obj, iterator, context) {
    if (obj == null) return;
      for (var key in obj) {
        if (this.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === {}) return;
        }
    }
  };
  this.has = function(obj, key) {
    return obj.hasOwnProperty(key);
  };
  this.contains = function(needle, haystack) {
	  for (var i = 0; i < haystack.length; i++) {
	        if (haystack[i] === needle) {
	            return true;
	        }
	    }
	    return false;
  };
};
ig.arrayUtils = new PluginArrayUtils();
});
