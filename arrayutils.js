ig.module(
    'plugins.midas.arrayutils'
)
.requires(
    'impact.impact'
)
.defines(function() {
PluginArrayUtils = function() {
	var populateDiffArray = function(array1, diffData) {
		var match = false;
		  for(var j = 0; j < array1.length; j++) {
			  match = false;
			  for(var i = 0; i < diffData.length; i++) {
				  if(ig.arrayUtils.compare(array1[j],diffData[i].item)) {
					  diffData[i].count++;
					  match = true;
				  }
			  }
			  if(!match) {
				  diffData.push({item: array1[j], count: 1});
			  }
		  }
		  return diffData;
	};
	
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
  
  this.removeDuplicates = function(dirtyArray) {
	  var cleaned = [];
	  var found = null;
	  for(var j = 0; j < dirtyArray.length; j++) {
		  var value = dirtyArray[j];
		  found = value;
		  for (var i = 0; i < cleaned.length; i++) {
		      if (this.compare(cleaned[i], value)) {
		        found = null;
		      }
		  }
		  if(found) {
	       	cleaned.push(found);
	      }
	  }
	  return cleaned;
  };
  
  this.compare =  function(array1, array2) {
	  if(!array1 || !array2) {
		  return false;
	  }
	  if(array1.length != array2.length) {
		  return false;
	  }
	  for (var i = 0; i < array1.length; i++) {
	        // Check if we have nested arrays
	        if (this[i] instanceof Array && array2[i] instanceof Array) {
	            // recurse into the nested arrays
	            if (!this.compare(array1[i],array2[i])) {
	                return false;
	            }
	        }
	        else if (array1[i] != array2[i]) {
	            // Warning - two different object instances will never be equal: {x:20} != {x:20}
	            return false;
	        }
	    }
	  return true;
  };
  
  this.diff = function(array1, array2) {
	  var diffData = [];
	  diffData = populateDiffArray(array1, diffData);
	  diffData = populateDiffArray(array2, diffData);
	  var diffResult = [];
	  for(var i = 0; i < diffData.length; i++) {
		  if(diffData[i].count <= 1) {
			  diffResult.push(diffData[i].item);
		  }
	  }
	  return diffResult;
  };
};
ig.arrayUtils = new PluginArrayUtils();
});
