ig.module(
    'plugins.midas.ajaxpromise'
)
.requires(
    'impact.impact',
    'plugins.midas.arrayutils'
)
.defines(function() {
PluginAjaxPromise = ig.Class.extend({
    doneCallbacks: [],
    failureCallbacks: [],
    alwaysCallbacks: [],
    result: null,
    state: 0,
    setResult: function(result) {
      this.result = result;
    },
    resolve: function() {
        this.state = PluginAjaxPromise.STATE.FULFILLED;
        this.isDone();
        this.isAlways();
    },
    reject: function() {
        this.state = PluginAjaxPromise.STATE.FAILED;
        this.isFailure();
        this.isAlways();
    },
    operateOnDelegates: function(callbackCollection) {
        var arrayUtils = new ArrayUtils();
        arrayUtils.each(callbackCollection, function(value){
            value(this.result);
            }, this);
    },
    isDone: function() {
        this.operateOnDelegates(this.doneCallbacks);
    },
    isFailure: function() {
        this.operateOnDelegates(this.failureCallbacks);
    },
    isAlways: function() {
        this.operateOnDelegates(this.alwaysCallbacks);
    },
    done: function(newDoneCallback) {
        if (this.state == PluginAjaxPromise.STATE.FULFILLED) {
            newDoneCallback(this.result);
        } else {
            this.doneCallbacks.push(newDoneCallback);
        }
    },
    fail: function(newFailCallback) {
        if (this.state == PluginAjaxPromise.STATE.FAILED) {
            newFailCallback(this.result);
        } else {
            this.failureCallbacks.push(newFailCallback);
        }
    },
    always: function(newAlwaysCallback) {
        if (this.state == PluginAjaxPromise.STATE.UNFULFILLED) {
            this.alwaysCallbacks.push(newAlwaysCallback);
        } else {
            newAlwaysCallback(this.result);
        }
    }
});
PluginAjaxPromise.STATE = {
    UNFULFILLED: 0,
    FULFILLED: 1,
    FAILED: 2
    };
});


