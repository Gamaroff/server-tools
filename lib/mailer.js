var nodemailer = require("nodemailer");

module.exports = function (config) {

    var self = this;

    // create reusable transport method (opens pool of SMTP connections)
    var smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth   : {
            user: config.user,
            pass: config.pass
        }
    });

    self.sendMail = function (from, recipients, subject, body, attachments, callback) {

        var mailOptions = {
            from       : from,
            subject    : subject,
            to         : recipients,
            html       : body,
            attachments: attachments
        };

        smtpTransport.sendMail(mailOptions, callback);

    };
};