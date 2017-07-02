;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Countdown = factory();
  }
}(this, function() {
    function Countdown(config){
    	this.ele = config.ele;
			this.step = config.step || 1000;
			this.t  = 0;
		}
		Countdown.STATUS = {
			STOP    : 0,
			RUNNING : 1
		};
		Countdown.prototype.createCustomEvent = function (name,obj){
			var event;
			if (window.CustomEvent) {
				event = new CustomEvent(name, {detail: obj});
			} else {
				event = this.ele.createEvent('CustomEvent');
				event.initCustomEvent(name, true, true, obj);
			}
			return event;
		};
		Countdown.prototype.fireCustomEvent = function (event) {
			this.ele.dispatchEvent(event);
		};
		Countdown.format = function(Timestamp){
			var d = Math.floor(Timestamp/86400000),
				h = Math.floor(Timestamp%86400000/3600000),
				m = Math.floor(Timestamp%3600000/60000),
				s = Math.floor(Timestamp%60000/1000),
				hh = h<10? '0'+h :h,
				mm = m<10? '0'+m :m,
				ss = s<10? '0'+s :s;
			return {
				d : d,
				h : h,
				m : m,
				s : s,
				hh: hh,
				mm: mm,
				ss: ss
			};
		};
		Countdown.prototype.start = function(time, force, cb){
			if(typeof force === 'function'){
				cb = force;
				force = false;
			}
			if(this.status === Countdown.STATUS.RUNNING){
				if(force){
					return this.restart(time, cb);
				}
				return;
			}
			this.status = Countdown.STATUS.RUNNING;
			var startTime = new Date();
			var self = this;
			this.t = setInterval(function(){
				var leftTime = Math.max(0, time - (new Date() - startTime));
				if(leftTime <= 0){
					self.stop();			
					self.fireCustomEvent(self.createCustomEvent('countdownFinished'));
				} else {
					self.fireCustomEvent(self.createCustomEvent('countdownProcess',{leftTime: leftTime}));
					cb && cb(0, leftTime);
				}
			}, self.step-50);
			return this;
		};
		Countdown.prototype.stop = function(){
			clearInterval(this.t);
			this.status = Countdown.STATUS.STOP;
			return this;
		};
		Countdown.prototype.restart = function(time, cb){
			this.stop();
			return this.start(time, cb);
		};
		Countdown.prototype.getStatus = function(){
			return this.status;
		};

		return Countdown;
}));