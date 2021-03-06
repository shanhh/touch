/**
 * vue-resource v0.1.17
 * https://github.com/vuejs/vue-resource
 * Released under the MIT License.
 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.VueResource=e():t.VueResource=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){function r(t){var e=n(1)(t);t.url=n(2)(e),t.http=n(3)(e),t.resource=n(7)(e),Object.defineProperties(t.prototype,{$url:{get:function(){return e.options(t.url,this,this.$options.url)}},$http:{get:function(){return e.options(t.http,this,this.$options.http)}},$resource:{get:function(){return t.resource.bind(this)}}})}window.Vue&&Vue.use(r),t.exports=r},function(t,e){t.exports=function(t){function e(t,r,o){for(var a in r)o&&(n.isPlainObject(r[a])||n.isArray(r[a]))?(n.isPlainObject(r[a])&&!n.isPlainObject(t[a])&&(t[a]={}),n.isArray(r[a])&&!n.isArray(t[a])&&(t[a]=[]),e(t[a],r[a],o)):void 0!==r[a]&&(t[a]=r[a])}var n=t.util.extend({},t.util);return n.isString=function(t){return"string"==typeof t},n.isFunction=function(t){return"function"==typeof t},n.options=function(t,e,r){return r=r||{},n.isFunction(r)&&(r=r.call(e)),n.extend(t.bind({vm:e,options:r}),t,{options:r})},n.each=function(t,e){var r,o;if("number"==typeof t.length)for(r=0;r<t.length;r++)e.call(t[r],t[r],r);else if(n.isObject(t))for(o in t)t.hasOwnProperty(o)&&e.call(t[o],t[o],o);return t},n.extend=function(t){var n,r=[],o=r.slice.call(arguments,1);return"boolean"==typeof t&&(n=t,t=o.shift()),o.forEach(function(r){e(t,r,n)}),t},n}},function(t,e){var n=document.documentMode,r=document.createElement("a");t.exports=function(t){function e(n,r){var o,i={},s={},u=n;return t.isPlainObject(u)||(u={url:n,params:r}),u=t.extend(!0,{},e.options,this.options,u),n=u.url.replace(/(\/?):([a-z]\w*)/gi,function(t,e,n){return u.params[n]?(i[n]=!0,e+a(u.params[n])):""}),t.isString(u.root)&&!n.match(/^(https?:)?\//)&&(n=u.root+"/"+n),t.each(u.params,function(t,e){i[e]||(s[e]=t)}),o=e.params(s),o&&(n+=(-1==n.indexOf("?")?"?":"&")+o),n}function o(e,n,r){var a,i=t.isArray(n),s=t.isPlainObject(n);t.each(n,function(n,u){a=t.isObject(n)||t.isArray(n),r&&(u=r+"["+(s||a?u:"")+"]"),!r&&i?e.add(n.name,n.value):a?o(e,n,u):e.add(u,n)})}function a(t){return i(t,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function i(t,e){return encodeURIComponent(t).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,e?"%20":"+")}return e.options={url:"",root:null,params:{}},e.params=function(e){var n=[];return n.add=function(e,n){t.isFunction(n)&&(n=n()),null===n&&(n=""),this.push(a(e)+"="+a(n))},o(n,e),n.join("&")},e.parse=function(t){return n&&(r.href=t,t=r.href),r.href=t,{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",port:r.port,host:r.host,hostname:r.hostname,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):""}},t.url=e}},function(t,e,n){var r=n(4),o=n(6),a=n(5);t.exports=function(t){function e(a,u){var c;return t.isPlainObject(a)&&(u=a,a=""),u=t.extend({url:a},u),u=t.extend(!0,{},e.options,this.options,u),null===u.crossOrigin&&(u.crossOrigin=s(u.url)),u.method=u.method.toUpperCase(),u.headers=t.extend({},e.headers.common,u.crossOrigin?{}:e.headers.custom,e.headers[u.method.toLowerCase()],u.headers),t.isPlainObject(u.data)&&/^(GET|JSONP)$/i.test(u.method)&&(t.extend(u.params,u.data),delete u.data),u.emulateHTTP&&!u.crossOrigin&&/^(PUT|PATCH|DELETE)$/i.test(u.method)&&(u.headers["X-HTTP-Method-Override"]=u.method,u.method="POST"),u.emulateJSON&&t.isPlainObject(u.data)&&(u.headers["Content-Type"]="application/x-www-form-urlencoded",u.data=t.url.params(u.data)),t.isObject(u.data)&&/FormData/i.test(u.data.toString())&&delete u.headers["Content-Type"],t.isPlainObject(u.data)&&(u.data=JSON.stringify(u.data)),c=("JSONP"==u.method?o:r).call(this.vm,t,u),c=n(c.then(i,i),this.vm),u.success&&(c=c.success(u.success)),u.error&&(c=c.error(u.error)),c}function n(t,e){return t.success=function(r){return n(t.then(function(t){return r.call(e,t.data,t.status,t)||t}),e)},t.error=function(r){return n(t.then(void 0,function(t){return r.call(e,t.data,t.status,t)||t}),e)},t.always=function(r){var o=function(t){return r.call(e,t.data,t.status,t)||t};return n(t.then(o,o),e)},t}function i(t){try{t.data=JSON.parse(t.responseText)}catch(e){t.data=t.responseText}return t.ok?t:a.reject(t)}function s(e){var n=t.url.parse(e);return n.protocol!==u.protocol||n.host!==u.host}var u=t.url.parse(location.href),c={"Content-Type":"application/json;charset=utf-8"};return e.options={method:"get",params:{},data:"",xhr:null,jsonp:"callback",beforeSend:null,crossOrigin:null,emulateHTTP:!1,emulateJSON:!1},e.headers={put:c,post:c,patch:c,"delete":c,common:{Accept:"application/json, text/plain, */*"},custom:{"X-Requested-With":"XMLHttpRequest"}},["get","put","post","patch","delete","jsonp"].forEach(function(n){e[n]=function(e,r,o,a){return t.isFunction(r)&&(a=o,o=r,r=void 0),this(e,t.extend({method:n,data:r,success:o},a))}}),t.http=e}},function(t,e,n){var r=n(5),o=window.XDomainRequest;t.exports=function(t,e){var n,a=new XMLHttpRequest;return o&&e.crossOrigin&&(a=new XDomainRequest,e.headers={}),t.isPlainObject(e.xhr)&&t.extend(a,e.xhr),t.isFunction(e.beforeSend)&&e.beforeSend.call(this,a,e),n=new r(function(n,r){a.open(e.method,t.url(e),!0),t.each(e.headers,function(t,e){a.setRequestHeader(e,t)});var o=function(t){a.ok="load"===t.type,a.ok&&a.status&&(a.ok=a.status>=200&&a.status<300),(a.ok?n:r)(a)};a.onload=o,a.onabort=o,a.onerror=o,a.send(e.data)})}},function(t,e){function n(t){this.state=a,this.value=void 0,this.deferred=[];var e=this;try{t(function(t){e.resolve(t)},function(t){e.reject(t)})}catch(n){e.reject(n)}}var r=0,o=1,a=2;n.reject=function(t){return new n(function(e,n){n(t)})},n.resolve=function(t){return new n(function(e,n){e(t)})},n.all=function(t){return new n(function(e,n){function r(n){return function(r){a[n]=r,o+=1,o===t.length&&e(a)}}var o=0,a=[];0===t.length&&e(a);for(var i=0;i<t.length;i+=1)t[i].then(r(i),n)})},n.race=function(t){return new n(function(e,n){for(var r=0;r<t.length;r+=1)t[r].then(e,n)})};var i=n.prototype;i.resolve=function(t){var e=this;if(e.state===a){if(t===e)throw new TypeError("Promise settled with itself.");var n=!1;try{var o=t&&t.then;if(null!==t&&"object"==typeof t&&"function"==typeof o)return void o.call(t,function(t){n||e.resolve(t),n=!0},function(t){n||e.reject(t),n=!0})}catch(i){return void(n||e.reject(i))}e.state=r,e.value=t,e.notify()}},i.reject=function(t){var e=this;if(e.state===a){if(t===e)throw new TypeError("Promise settled with itself.");e.state=o,e.value=t,e.notify()}},i.notify=function(){var t=this;u(function(){if(t.state!==a)for(;t.deferred.length;){var e=t.deferred.shift(),n=e[0],i=e[1],s=e[2],u=e[3];try{t.state===r?s("function"==typeof n?n.call(void 0,t.value):t.value):t.state===o&&("function"==typeof i?s(i.call(void 0,t.value)):u(t.value))}catch(c){u(c)}}})},i["catch"]=function(t){return this.then(void 0,t)},i.then=function(t,e){var r=this;return new n(function(n,o){r.deferred.push([t,e,n,o]),r.notify()})};var s=[],u=function(t){s.push(t),1===s.length&&u.async()};if(u.run=function(){for(;s.length;)s[0](),s.shift()},window.MutationObserver){var c=document.createElement("div"),f=new MutationObserver(u.run);f.observe(c,{attributes:!0}),u.async=function(){c.setAttribute("x",0)}}else u.async=function(){setTimeout(u.run)};t.exports=window.Promise||n},function(t,e,n){var r=n(5);t.exports=function(t,e){var n,o,a="_jsonp"+Math.random().toString(36).substr(2),i={};return e.params[e.jsonp]=a,t.isFunction(e.beforeSend)&&e.beforeSend.call(this,{},e),new r(function(r,s){n=document.createElement("script"),n.src=t.url(e),n.type="text/javascript",n.async=!0,window[a]=function(t){o=t};var u=function(t){delete window[a],document.body.removeChild(n),"load"!==t.type||o||(t.type="error"),i.ok="error"!==t.type,i.status=i.ok?200:404,i.responseText=o?o:t.type,(i.ok?r:s)(i)};n.onload=u,n.onerror=u,document.body.appendChild(n)})}},function(t,e){t.exports=function(t){function e(r,o,a,i){var s=this,u={};return a=t.extend({},e.actions,a),t.each(a,function(e,a){e=t.extend(!0,{url:r,params:o||{}},i,e),u[a]=function(){return(s.$http||t.http)(n(e,arguments))}}),u}function n(e,n){var r,o,a,i=t.extend({},e),s={};switch(n.length){case 4:a=n[3],o=n[2];case 3:case 2:if(!t.isFunction(n[1])){s=n[0],r=n[1],o=n[2];break}if(t.isFunction(n[0])){o=n[0],a=n[1];break}o=n[1],a=n[2];case 1:t.isFunction(n[0])?o=n[0]:/^(POST|PUT|PATCH)$/i.test(i.method)?r=n[0]:s=n[0];break;case 0:break;default:throw"Expected up to 4 arguments [params, data, success, error], got "+n.length+" arguments"}return i.data=r,i.params=t.extend({},i.params,s),o&&(i.success=o),a&&(i.error=a),i}return e.actions={get:{method:"GET"},save:{method:"POST"},query:{method:"GET"},update:{method:"PUT"},remove:{method:"DELETE"},"delete":{method:"DELETE"}},t.resource=e}}])});
Vue.http.options.emulateJSON = true;
/**
	公用filter
*/
/* 分转换为元 */
Vue.filter('fen2yuan', function (value) {
	return value ? value/100 : 0;
});
/* 分转换为万 */
Vue.filter('fen2wan', function (value) {
	return value ? value/1000000 : 0;
});
/* 金额统一格式化 */
Vue.filter('numberFormat',function(value,decimals,dec_point,thousands_sep,dec_method) {
	return Util.numberFormat(value, decimals ? +decimals : 2, dec_point ? dec_point : undefined, thousands_sep ? thousands_sep : undefined, dec_method);
});
/* 如果金额是20.00 则抹去00 显示20 */
Vue.filter('numberRemoveZero',function(value) {
	var v = Number(value);
	return parseInt(v) === v ? parseInt(v) : value;
});
/* 金额统一格式化 */
Vue.filter('formatMoneyDisplay',function(value){
	var scale = 100; // 1元，100分
	var amount = 0;
	// 小于10000，直接展示金额
	if (+value < 10000 * scale) {
		amount = Util.numberFormat(+value/100);
	} else {
		// 大于1万
		scale *= 100 * 100;
		if(+value % scale === 0){
			amount = Util.numberFormat(+value / scale);
		}else{
			amount = Util.numberFormat(+value / scale,2);
		}
		amount = amount + '万';
	}
	return amount;
});
/* 添加百分比%这个单位 */
Vue.filter('addPercentage',function(value){
	return value + '%';
});
/* 去掉 ###（元）后面这个（元）这三个字符 */
Vue.filter('splitYuan', function (value) {
	return value ? value.slice(0,-3) : '';
});
/* 投资劵名字格式化 */
Vue.filter('couponNameFormat',function(amount,minAmount,type){
	if (+type===1) {
		//满减卷
		return '满'+ minAmount/100 + '减' + amount/100 +'元';
	}else if (+type===2) {
		//加息劵
		if (+minAmount===0) {
			return '无限制';
		}else {
			return '满'+ minAmount/100 + '元可用';
		}
	}
});
/*将时间进行换行显示*/
Vue.filter('formatTimeChangeLine', function (value,line) {
	if (+line===1) {
		return value.slice(0, 10);
	}else if(+line===2) {
		return value.slice(11, 19);
	}
})
/*将天数转换为月*/
Vue.filter('days2months', function (value) {
	if (+value<15) {
		return 1;
	}else {
		return Math.round(+value/30);
	}
});
/*日期转换*/
Vue.filter('formatDate', function (value) {
	var t = new Date(value.replace(/-/g, "/"));
	return t.getFullYear()+'年'+(t.getMonth()+1)+'月'+t.getDate()+'日';
});
/*预售转换*/
Vue.filter('formatPreDate', function (value) {
	var t = new Date(value.replace(/-/g, "/"));
	var n = new Date();
	var e = new Date(n.getFullYear()+'/'+(n.getMonth()+1)+'/'+n.getDate()+' 23:59:59');
	if (t.getTime()>e.getTime()) {
		return (t.getMonth()+1)+'月'+t.getDate()+'日';
	}else {
		return t.getHours()+':'+ (t.getMinutes()<10 ? '0'+t.getMinutes() : t.getMinutes());
	}
});
/**
	公用directive
*/
Vue.directive('imgload',{
	update: function (url) {
		var vm = this;
		var img = new Image();
		img.src = url;
		img.onload = function() {
			vm.el.src = url;
		}
	}
});
/**
	公用method
*/
var vueUtil = {
	/*增加Toast*/
	addToast : function () {
		var doms = '<div class="l-h-center g-toast-container"><span class="g-toast"></span></div>';
		Util.appendHtml(document.body,doms);
	},
	/*默认的错误网络处理*/
	handleNetError : function (msg) {
		/*
			msg: 错误信息
		*/
		var toast = document.querySelector('.g-toast');
		var showTime = 3000;
		if (!toast) {
			vueUtil.addToast();
			toast = document.querySelector('.g-toast');
		};
		var contaniner = document.querySelector('.g-toast-container');
		toast.innerText = msg || '发生错误，请稍后重试';
		contaniner.style.display = 'block';
		setTimeout(function(){
			contaniner.style.display = 'none';
		},showTime);
	},
	/*加载更多*/
	loadingMore: function(vm,callback) {
		/*
			vm: vue对象
			callback: 如果可以翻页，需要进行的操作
		*/
		if (!vm.$data.pageView.show_more) {
			return false;
		} else {
			vm.$data.pageView.show_more_text = '正在加载...';
			callback();
			vm.$data.pageView.page++;
		}
	},
	/* POST 请求 */
	post: function (API,requestData,successCallback,errorCallback,hideError) {
		/*
			API: API URL
			requestData: 请求的参数
			successCallback: 请求成功的cb
			errorCallback: 请求失败的cb
			hideError: 不显示错误信息
		*/
		var resource =  Vue.resource(API);
		resource.save(requestData, function (data, status, request) {
			if (data.code===1) {
				var fetchData = data.data;
				successCallback && successCallback(fetchData);
			}else {
				errorCallback && errorCallback(data);
				if (!hideError) {
					vueUtil.handleNetError(data.message || '网络不给力，请稍后重试');
				}
			}
		}).error(function(data) {
			errorCallback && errorCallback(data);
			if (!hideError) {
				vueUtil.handleNetError(data.message || '网络不给力，请稍后重试');
			}
		});
	},
	/* GET 请求 */
	get: function (API,requestData,successCallback,errorCallback,hideError) {
		/*
			API: API URL
			requestData: 请求的参数
			successCallback: 请求成功的cb
			errorCallback: 请求失败的cb
			hideError: 不显示错误信息
		*/
		var resource =  Vue.resource(API);
		resource.get(requestData, function (data, status, request) {
			if (data.code===1) {
				var fetchData = data.data;
				successCallback && successCallback(fetchData);
			}else {
				errorCallback && errorCallback(data);
				if (!hideError) {
					vueUtil.handleNetError(data.message || '网络不给力，请稍后重试');
				}
			}
		}).error(function(data) {
			errorCallback && errorCallback(data);
			if (!hideError) {
				vueUtil.handleNetError('网络不给力，请稍后重试');
			}
		});
	},
	pageView : function (vm,type,fetchData,setDataCallback,itemsName) {
		/*
			vm: vue对象
			type: normal 为正常的分页
						firstPage 为首屏数量不一定的分页
			fetchData: 获取的数据
			setDataCallback: 需要展示数据的cb
		*/
		if (typeof itemsName === 'undefined' ) {
			itemsName = 'items';
		}
		var normal = function (vm,fetchData,setDataCallback) {
			if (!fetchData) {return false;}
			if (fetchData.total > vm.$data.pageView.page_size) {
				vm.$data.pageView.show_more = true;
			}else {
				vm.$data.pageView.show_more = false;
			}
			if (fetchData[itemsName].length>0) {
				vm.$set('pageView.total_loaded',vm.$data.pageView.total_loaded + fetchData[itemsName].length);
				if (vm.$data.pageView.total_loaded === fetchData.total) {
					vm.$data.pageView.show_more = false;
					vm.$data.pageView.page = 2;
				}
				vm.$data.pageView.show_more_text = '加载更多';
				setDataCallback && setDataCallback();
			}else {
				vm.$data.pageView.show_more = false;
				vm.$data.pageView.page = 2;
			}
		};
		var firstPage = function (vm,fetchData,setDataCallback) {
			if (!fetchData) {return false;}
			if (fetchData[itemsName].length>0) {
				vm.$data.pageView.show_more_text = '加载更多';
				setDataCallback && setDataCallback();
				vm.$set('pageView.total_loaded',vm.$data.pageView.total_loaded + fetchData[itemsName].length);
				if (vm.$data.pageView.total_loaded === fetchData.total) {
					vm.$data.pageView.show_more = false;
					vm.$data.pageView.page = 2;
				}else {
					vm.$data.pageView.show_more = true;
				}
			}else {
				vm.$data.pageView.show_more = false;
				vm.$data.pageView.page = 2;
			}
		};
		if (type==='normal') {
		 	normal(vm,fetchData,setDataCallback);
		}else if(type==='firstPage') {
			firstPage(vm,fetchData,setDataCallback);
		}
	},
	isPositive : function (value) {
		if (+value >0 ) {
			return true;
		}else {
			return false;
		}
	}
}