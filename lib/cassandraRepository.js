var uuid = require('node-uuid');
var moment = require('moment');
var _ = require('underscore');

module.exports = function (name, schema) {

	var self = this;

	self.name = name;

	var _client, _insertStatement, _createStatement;
	var _initialised = false;
	var _hints = [], _fields = [];

	//region Configuration
	var sortedSchema = _.sortBy(schema, function (item) {
		return item.id;
	});

	_createStatement = 'CREATE TABLE IF NOT EXISTS ' + name + ' (';
	_insertStatement = 'INSERT INTO ' + name + ' (';

	var primaryKey = 'PRIMARY KEY (';
	var primaryKeys = [];

	for (var i = 0; i < sortedSchema.length; i++) {
		_createStatement += sortedSchema[i].id + ' ' + sortedSchema[i].type + ', ';
		_insertStatement += sortedSchema[i].id + ', ';
		_hints.push(sortedSchema[i].type);
		_fields.push(sortedSchema[i].id);

		if (sortedSchema[i].primary >= 0) {
			primaryKeys.splice(sortedSchema[i].primary, 0, sortedSchema[i].id);
		}
	}

	if (primaryKeys.length > 0) {
		for (var i = 0; i < primaryKeys.length; i++) {
			primaryKey += primaryKeys[i];

			if (i < primaryKeys.length - 1) {
				primaryKey += ', ';
			}
		}

		_createStatement += primaryKey + ')';
	} else {
		_createStatement = _createStatement.substr(0, _createStatement.length - 2);
	}

	_createStatement += ');'; // take off last comma
	_insertStatement = _insertStatement.substr(0, _insertStatement.length - 2) + ') '; // take off last comma

	_insertStatement += ' VALUES(';

	for (var i = 0; i < schema.length; i++) {
		_insertStatement += '?';

		if (i < schema.length - 1) {
			_insertStatement += ', ';
		}
	}

	_insertStatement += ');';

	//endregion

	self.createTable = function (client, callback) {

		_client = client;

		_client.execute(_createStatement, function (err, result) {
			if (err) {
				callback('Error creating table ' + name + ': ' + err);
			} else {
				self.initialised = true;
				callback(null, true);
			}
		});
	};

	self.insert = function (data, callback) {

		var queryOptions = {
			prepare : true,
			hints   : _hints
		};

		var dto = [];

		_.each(_fields, function (field) {
			dto.push(data[field]);
		});

		_client.execute(_insertStatement, dto, queryOptions, function (err) {
			if (err) {
				callback(err);
			} else {
				callback(null, true);
			}
		});
	};

	self.batchInsert = function (data, callback) {
		var batch = [];

		var queryOptions = {
			hints : []
		};

		_.each(data, function (item) {

			queryOptions.hints.push(_hints);

			var dto = [];

			_.each(_fields, function (field) {
				dto.push(item[field]);
			});

			batch.push({
				query  : _insertStatement,
				params : dto
			});
		});

		if (batch.length > 0) {
			_client.batch(batch, queryOptions, function (err) {
				if (err) {
					callback(err);
				} else {
					callback(null, true);
				}
			});
		} else {
			callback('No records to save');
		}

	};

	self.select = function () {

		var callback;
		var fields;
		var criteria;

		for (var i = 0; i < arguments.length; i++) {
			switch (typeof arguments[i]) {
				case 'function':
					callback = arguments[i];
					break;
				case 'object':
					if (arguments[i] instanceof Array) {

						if (!fields) {
							fields = arguments[i].toString()
						} else {
							criteria = arguments[i];
						}
					}
					break;
			}
		}

		var params = [];
		var query = 'SELECT ' + fields.toString() + ' FROM ' + self.name;

		if (criteria) {
			query += ' WHERE ';

			for (var i = 0; i < criteria.length; i++) {
				var c = criteria[i];

				params.push(c.value);
				query += c.key + c.operation + ' ? ';

				if (i < criteria.length - 1) {
					query += ' AND '
				}
			}

		}

		_client.execute(query, params, function (err, result) {
			if (result && result.rows && result.rows) {
				callback(null, result.rows);
			} else {
				if (err) {
					callback(err);
				} else {
					callback('No items');
				}
			}
		});
	};

};
