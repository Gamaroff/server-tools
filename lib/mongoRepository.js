var model = require('./mongoModel');
var promises = require('./promises');
var uuid = require('node-uuid');
var moment = require('moment');

module.exports = function (type) {

	var self = this;

	self.get = function () {

		var callback;
		var data;

		for (var i = 0; i < arguments.length; i++) {
			switch (typeof arguments[i]) {
				case 'function':
					callback = arguments[i];
					break;
				case 'object':
					data = arguments[i];
					break;
			}
		}

		if (!data) {
			data = {
				query  : null,
				fields : null,
				sort   : null,
				skip   : null,
				limit  : null
			};
		}

		var obj = new model(type);

		promises.query(obj, data.query || {}, data.sort || {}, data.limit, data.skip, data.fields || [])
			.then(function (result) {
				if (result && result.length > 0) {
					callback(null, result);
				} else {
					callback('No items found');
				}

			}, callback);
	};

	self.save = function (data, callback) {
		var obj = new model(type);

		if (!data._id) {
			data._id = uuid.v4();
			data.is_new = true;
		}

		data.date_stamp = moment().unix();

		if (data.is_new) {
			obj.save(data, function (err, result) {
				if (callback) {
					callback(err, result);
				}
			});
		} else {

			promises.query(obj, {_id : data._id})
				.then(function (result) {
					if (result && result.length > 0) {

						var id = result[0]._id;
						delete data._id;

						obj.update({_id : id}, data, function (err, result) {
							if (callback) {
								callback(err, result);
							}
						});

					} else {
						obj.save(data, function (err, result) {
							if (callback) {
								callback(err, result);
							}
						});
					}

				}, callback);
		}

	};

	self.update = function (data, callback) {
		var obj = new model(type);

		obj.update(data.query, data.update, data.options, function (err, result) {
			if (callback) {
				callback(err, result);
			}
		});

	};

	self.addToSet = function (query, field, data, callback) {
		var obj = new model(type);

		obj.updateSet(query, field, data, function (err, result) {
			callback(err, result);
		});

	};

	self.push = function (query, field, data, callback) {
		var obj = new model(type);

		obj.push(query, field, data, function (err, result) {
			callback(err, result);
		});

	};

	self.aggregate = function (pipeline, callback) {
		var obj = new model(type);
		obj.aggregate(pipeline, function (err, result) {
			callback(err, result);
		});
	};

	self.delete = function (id, callback) {
		var obj = new model(type);
		obj.delete(id, function (err, result) {
			callback(err, result);
		});
	};
};
