var tools = require('./tools');

function Redis() {
	'use strict';

	var self = this;
	var Client = null;

	self.init = function (client) {
		Client = client;
	};

	self.delete = function (key, callback) {
		if (Client) {
			Client.del(key, function (err, result) {
				if (callback) {
					callback(err, result);
				}
			});
		}
	};

	self.getHash = function (key, callback) {
		if (Client) {
			Client.hgetall(key, function (err, result) {
				if (callback) {
					callback(err, result);
				}
			});
		}
	};

	self.setHash = function (key, items, callback) {
		if (Client) {

			var data = tools.clone(items);

			for (var property in data) {
				if (typeof data[property] == 'object') {
					delete data[property];
				}
			}

			Client.hmset(key, data, function (err, result) {
				if (callback) {
					callback(err, result);
				}
			});
		}
	};

	self.deleteKey = function (key, callback) {
		if (Client) {

			Client.del(key, function (err, result) {
				if (callback) {
					callback(err, result);
				}
			});
		}
	};

	self.getSet = function (key, callback) {
		if (Client) {
			Client.smembers(key, function (err, result) {
				if (callback) {
					callback(err, result);
				}
			});
		}
	};

	self.addItemToSet = function (key, item, callback) {
		if (Client) {
			Client.sadd(key, item, function (err, result) {
				if (callback) {
					callback(err, result);
				}
			});
		}
	};

	self.removeItemFromSet = function (key, item, callback) {
		if (Client) {

			self.isMember(key, item, function (err, result) {
				if (result) {
					Client.srem(key, item, function (err, result) {
						if (callback) {
							callback(err, result);
						}
					});
				}
			});

		}
	};

	self.isMember = function (setName, value, callback) {
		if (Client) {
			Client.sismember(setName, value, function (err, result) {
				if (callback) {
					callback(err, result);
				}
			});
		}
	};

	self.count = function (setName, callback) {
		if (Client) {
			Client.scard(setName, function (err, result) {
				if (callback) {
					callback(err, result);
				}
			});
		}
	};

	self.addItemToList = function (key, item, callback) {
		if (Client) {
			Client.lpush(key, item, function (err, result) {
				if (callback) {
					callback(err, result);
				}
			});
		}
	};

	self.removeItemFromList = function (key, item, callback) {
		if (Client) {
			Client.rpop(key, item, function (err, result) {
				if (callback) {
					callback(err, result);
				}
			});
		}
	};

	self.popItemFromSet = function (key, callback) {
		if (Client) {
			Client.spop(key, function (err, result) {
				if (callback) {
					callback(err, result);
				}
			});
		}
	};

}
module.exports = new Redis();