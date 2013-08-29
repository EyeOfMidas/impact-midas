ig.module(
    'plugins.ajax'
)
.requires(
    'impact.impact',
    'plugins.ajaxpromise'
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
                    promise.setResult(request);
                    if(request.status == 200 ) {
                        promise.resolve();
                    } else {
                        promise.reject();
                    }
            }
        };
        request.open('GET', url, true);
        request.send();
        return promise;
    }
});
});


