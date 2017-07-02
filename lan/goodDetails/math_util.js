;(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root._Math = factory();
	}
}(this, function() {
	var _Math = {
		_getDecimalLength : function(value) {
			var list = (value + '').split('.'), 
					result = 0;
			if (list[1] !== undefined && list[1].length > 0) {
				result = list[1].length;
			}
			return result;
		},
		mul: function (num1,num2) {
			var intValue1 = Number(num1.toString().replace('.', '')),
					intValue2 = Number(num2.toString().replace('.', '')),
					decimalLength = _Math._getDecimalLength(num1) + _Math._getDecimalLength(num2);
			return intValue1 * intValue2 / Math.pow(10, decimalLength);
		},
		add: function (num1,num2) {
			var baseNum = Math.pow(10, Math.max(_Math._getDecimalLength(num1), _Math._getDecimalLength(num2)));
			return (_Math.mul(num1,baseNum) + _Math.mul(num2,baseNum)) / baseNum;
		},
		sub: function (num1,num2) {
			var baseNum = Math.pow(10, Math.max(_Math._getDecimalLength(num1), _Math._getDecimalLength(num2)));
			return ((_Math.mul(num1,baseNum) - _Math.mul(num2,baseNum)) / baseNum);
		},
		div: function (num1,num2) {
			var intValue1 = Number(num1.toString().replace('.', '')),
					intValue2 = Number(num2.toString().replace('.', ''));
			return _Math.mul((intValue1 / intValue2), Math.pow(10, _Math._getDecimalLength(num2) - _Math._getDecimalLength(num1)));
		}
	}
	return _Math;
}));