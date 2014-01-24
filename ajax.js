ig.module(
    'plugins.midas.ajax'
)
.requires(
    'impact.impact',
    'plugins.midas.ajaxpromise'
)
.defines(function() {
 
PluginAjax = ig.Class.extend({
    get: function(url) {
        var promise = new PluginAjaxPromise();
        var request = null;
        if (window.XMLHttpRequest){
            // code for IE7+, Firefox, Chrome, Opera, Safari
            request = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }

        request.onreadystatechange = function() {
                if( request.readyState == 4) {
                    if(request.status == 200 ) {
                    	promise.setResult(request);
                        promise.resolve();
                    } else {
                        promise.reject();
                    }
            }
        };
        request.open('GET', url, true);
        request.send();
        return promise;
    },
    getJson: function(url) {
        var promise = new PluginAjaxPromise();
        var request = null;
        if (window.XMLHttpRequest){
            // code for IE7+, Firefox, Chrome, Opera, Safari
            request = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }

        request.onreadystatechange = function() {
                if( request.readyState == 4) {
                    if(request.status == 200 ) {
                        promise.setResult(JSON.parse(request.response));
                        promise.resolve();
                    } else {
                        promise.setResult({});
                        promise.reject();
                    }
            }
        };
        request.open('GET', url, true);
        request.send();
        return promise;
    },
    post: function(url, data) {
        var promise = new PluginAjaxPromise();
        var request = null;
        if (window.XMLHttpRequest){
            // code for IE7+, Firefox, Chrome, Opera, Safari
            request = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }

        request.onreadystatechange = function() {
                if( request.readyState == 4) {
                    if(request.status == 200 ) {
                    	promise.setResult(request);
                        promise.resolve();
                    } else {
                        promise.reject();
                    }
            }
        };
        request.open('POST', url, true);
        request.send(this.dataToParams(data));
        return promise;
    },
    postJson: function(url, data) {
        var promise = new PluginAjaxPromise();
        var request = null;
        if (window.XMLHttpRequest){
            // code for IE7+, Firefox, Chrome, Opera, Safari
            request = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }

        request.onreadystatechange = function() {
                if( request.readyState == 4) {
                	
                    if(request.status == 200 ) {
                    	promise.setResult(JSON.parse(request.response));
                        promise.resolve();
                    } else {
                        promise.reject();
                    }
            }
        };
        request.open('POST', url, true);
        request.send(this.dataToParams(data));
        return promise;
    },
    dataToParams: function(data) {
        var paramArray = [];
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var value = data[key];
                if(typeof value === 'object') {
                	value = JSON.stringify(value);
                }
                paramArray.push(key + "=" + value);
            }
            
        }
        return paramArray.join("&");
    }
    
});
ig.ajax = new PluginAjax();
});


