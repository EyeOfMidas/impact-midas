ig.module(
    'plugins.midas.browserinfo'
)
.requires(
    'impact.impact'
)
.defines(function() {
PluginBrowserInfo = function() {
    this.getName = function() {
    	var name = navigator.appName;
    	var userAgent = navigator.userAgent;
        var nameMatch = userAgent.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
        if(nameMatch) {
        	name = nameMatch[1];
        }
        return name;
    };
  
    this.getVersion = function() {
    	var version = navigator.appVersion;
    	var userAgent = navigator.userAgent;
    	var versionMatch = userAgent.match(/version\/([\.\d]+)/i);
        var nameMatch = userAgent.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
        if(nameMatch) {
        	version = nameMatch[2];
        	if(versionMatch != null) {
        		version = versionMatch[1];
        	}
        } 
        return version;
    };
    
    this.getMajorVersion = function() {
    	return this.getVersion().split('.')[0];
    };
    this.getMinorVersion = function() {
    	return this.getVersion().split('.')[1];
    };
    
    this.shouldBlock = function(browserFilter) {
    	for(var i = 0; i < browserFilter.length; i++) {
    		var browserRule = browserFilter[i];
    		if(browserRule.name.toLowerCase() == this.getName().toLowerCase()
    				&& this.getMajorVersion() <= browserRule.version) {
    			return true;
    		}
    	}
    	return false;
    };
};
ig.browserInfo = new PluginBrowserInfo();
});
