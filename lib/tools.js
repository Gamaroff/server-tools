var ncp = require('ncp').ncp;
var fs = require('fs');
var moment = require('moment');
var _ = require('underscore');

function Tools() {
	'use strict';

	var self = this;

	self.formatString = function (str, args) {
		var regex = new RegExp('{-?[0-9]+}', 'g');

		var result = str.replace(regex, function (item) {
			var intVal = parseInt(item.substring(1, item.length - 1));
			var replace;
			if (intVal >= 0) {
				//replace = isNaN(args[intVal]) ? '\'' + args[intVal] + '\'' : args[intVal];
				replace = args[intVal] || '';
			} else if (intVal === -1) {
				replace = '{';
			} else if (intVal === -2) {
				replace = '}';
			} else {
				replace = '';
			}
			return replace;
		});

		return result;

	};

	self.replaceAll = function (str, find, replace) {
		if (find instanceof Array) {

			for (var i = 0; i < find.length; i++) {
				var item = find[i];
				str = str.replace(new RegExp(item, 'g'), replace);
			}

			return str;

		} else {
			if (find == '*') {
				return str.replace(/\*/g, replace);
			} else {
				return str.replace(new RegExp(find, 'g'), replace);
			}
		}
	};

	self.parseQueryString = function (querystring) {

		if (typeof querystring !== 'string') {
			return {err : 'Incorrectly formatted query'};
		}
		else {
			var str = querystring.split('&');
			var query = {};

			str.forEach(function (item) {
				var p = item.split('=');
				query[p[0]] = p[1];
			});

			return {query : query};
		}

	};

	self.isNullOrUndefined = function (value) {
		return null === value || undefined === value;
	};

	self.isEqual = function (obj1, obj2) {
		var result = true;

		for (var prop in obj1) {
			if (obj2[prop] !== obj1[prop]) {
				result = false;
			}
		}

		return result;
	};

	self.trim = function (string) {
		return string.replace(/^\s*|\s*$/g, '')
	};

	self.makeId = function (str) {
		var low = str.toLowerCase();
		return self.replaceAll(low, ' ', '_');
	};

	self.copyFile = function (source, target, callback) {
		ncp(source, target, function (err) {
			if (err) {
				callback(err);
			}
			callback();
		});
	};

	self.roundMinuteUp = function (date, interval) {

		date = moment.unix(date);

		var intervalsInMinute = 60 / interval;

		if (intervalsInMinute > 60 || intervalsInMinute < 0) {
			return null;
		}

		var intervals = Math.floor(date.minutes() / interval);
		if (date.minutes() % interval != 0) {
			intervals++;
		}
		if (intervals == intervalsInMinute) {
			date.add('hours', 1);
			intervals = 0;
		}
		date.minutes(intervals * interval);
		date.seconds(0);
		return date.unix();

	};

	self.roundMinuteDown = function (date, interval) {

		date = moment.unix(date);

		var intervalsInMinute = 60 / interval;

		if (intervalsInMinute > 60 || intervalsInMinute < 0) {
			return null;
		}

		var remainder = date.minutes() % interval;
		date.subtract('minutes', remainder);

		date.seconds(0);
		return date.unix();

	};

	self.write = function (name, path, data, callback) {
		fs.exists(path, function (exists) {
			if (!exists) {
				fs.mkdir(path, function (err) {

					if (!err) {
						writeFile(path, name, data, callback);
					} else {
						callback('Error creating directory: ' + err);
					}

				});
			} else {
				writeFile(path, name, data, callback);
			}
		});

		var writeFile = function (path, name, data, callback) {
			fs.writeFile(path + '/' + name, data, function (err) {
				if (callback) {
					if (err) {
						callback(err);
					} else {
						callback(null, true);
					}
				}
			});
		}
	};

	self.buildObject = function (object, arrayTypes) {

		var data = {};

		var arrayCache = {};

		_.each(arrayTypes, function (type) {
			arrayCache[type] = [];
		});

		function buildObject(path, value) {
			var schema = data;  // a moving reference to internal objects within obj
			var pList = path.split('.');
			var len = pList.length;
			var current = '';

			for (var i = 0; i < len - 1; i++) {
				var elem = pList[i];

				if (current) {
					current += '.' + elem;
				} else {
					current = elem;
				}

				var isArray;
				_.each(arrayTypes, function (type) {
					if (current.indexOf(type) >= 0) {
						isArray = true
					}
				});

				if (!schema[elem]) {
					if (isArray) {
						schema[elem] = [];
					} else {
						schema[elem] = {};
					}

				}
				schema = schema[elem];
			}

			var item = pList[len - 1];

			if (value instanceof Array && !isArray) {
				if (value.length > 1) {
					schema[pList[len - 1]] = value;
				}
				else {
					schema[pList[len - 1]] = value[0];
				}
			} else {

				_.each(value, function (v, i) {
					if (arrayCache[current][i]) {
						arrayCache[current][i][item] = v;
					} else {
						arrayCache[current][i] = {};
						arrayCache[current][i][item] = v;
					}
				});

				var a = arrayCache;

				// schema[pList[len - 1]] = value;
			}

		}

		for (var property in object) {
			var value = object[property];
			buildObject(property, value);
		}

		_.each(arrayTypes, function (type) {
			// self.setProperty(type, data, arrayCache[type]);
			self.assignObjectProperty(data, type, arrayCache[type]);
		});

		return data;

	};

	self.assignObjectProperty = function (obj, prop, value) {
		if (typeof prop === 'string') {
			prop = prop.split('.');
		}

		if (prop.length > 1) {
			var e = prop.shift();
			self.assignObjectProperty(obj[e] =
				Object.prototype.toString.call(obj[e]) === '[object Object]'
					? obj[e] : {}, prop, value);
		} else {
			obj[prop[0]] = value;
		}
	};

	self.clone = function (obj) {
		return JSON.parse(JSON.stringify(obj));
	};

}

module.exports = new Tools();

