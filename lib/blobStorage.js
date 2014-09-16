//var azure = require('azure');
//var Constants = azure.Constants;
//var BlobConstants = Constants.BlobConstants;
//var fs = require('fs');
//
//module.exports = function BlobStorage(storageAccountOrConnectionString, storageAccessKey, host) {
//    'use strict';
//
//    var self = this;
//
//    var blobService = azure.createBlobService(storageAccountOrConnectionString, storageAccessKey, host);
//
//    self.saveStream = function (container, blockBlobName, stream, callback) {
//        var options = {
//            contentType    : 'application/pdf',
//            contentEncoding: 'base64'
//        };
//
//        blobService.createContainerIfNotExists(container, {publicAccessLevel: 'blob'}, function (error) {
//            if (!error) {
//
//                // first Method
//
//                var uploadFile = function (dataLength) {
//
//                    console.log('uploading file')
//                    blobService.createBlockBlobFromStream(container, blockBlobName, stream, dataLength, options, function (err, result) {
//                        console.log('file uploaded')
//
//                        if (err) {
//                            callback('Error saving file: ' + err);
//                        } else {
//
//                            var dto = {
//                                file: 'http://' + storageAccountOrConnectionString + '.blob.core.windows.net/' + container + '/' + blockBlobName
//                            };
//
//                            callback(null, dto);
//                        }
//                    });
//                };
//
//                var dataLength = 0;
//
//                stream
//                    .on('data', function (chunk) {
//                        dataLength += chunk.length;
//                    })
//                    .on('end', function () {  // done
//                        console.log('Ending : ' + new Date());
//                        console.log('The length was: ' + dataLength);
//
//                        uploadFile(dataLength);
//                    });
//
//                stream.end();
//
//                // ======================================================================
//
//
//                // Second method
//
////                stream.pipe(blobService.createBlob(container, blockBlobName, BlobConstants.BlobTypes.BLOCK, function (err, result) {
////                    var dto = {
////                        file: 'http://' + storageAccountOrConnectionString + '.blob.core.windows.net/' + container + '/' + blockBlobName
////                    };
////
////                    callback(null, dto);
////                }));
//
//
//            } else {
//                callback('Container could not be created.')
//            }
//        });
//    };
//
//    self.saveFile = function (container, path, file, callback) {
//
//        var options = {
//            contentType    : 'application/pdf',
//            contentEncoding: 'base64'
//        };
//
//        blobService.createContainerIfNotExists(container, {publicAccessLevel: 'blob'}, function (error) {
//            if (!error) {
//                // Container exists and is public
//                blobService.createBlockBlobFromFile(container, file, path + file, options, function (err, result) {
//                    if (err) {
//                        callback('Error saving file: ' + err);
//                    } else {
//
//                        var dto = {
//                            file: 'http://' + storageAccountOrConnectionString + '.blob.core.windows.net/' + container + '/' + file
//                        };
//
//                        callback(null, dto);
//                    }
//                });
//            } else {
//                callback('Container could not be created.')
//            }
//        });
//
//    };
//
//    self.saveFileSimple = function (container, path, file, callback) {
//
//        var options = {
//            contentType     : 'application/pdf',
//            contentEncoding : 'base64'
//        };
//
//        blobService.createBlockBlobFromFile(container, file, path + file, options, callback);
//    };
//
//    self.saveText = function (container, fileName, text, callback) {
//
//        var options = {
//            contentType     : 'text',
//            contentEncoding : 'utf8'
//        };
//
//        blobService.createBlockBlobFromText(container, fileName, text, options, function (uploadError, blob, uploadResponse) {
//            callback(uploadError, blob, uploadResponse)
//        });
//
//    };
//
//}
//
