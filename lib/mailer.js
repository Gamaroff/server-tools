var nodemailer = require("nodemailer");
var emailConfig = require('config').Email;
var _ = require('underscore');
var moment = require('moment');

function Mailer() {

    var self = this;

    // create reusable transport method (opens pool of SMTP connections)
    var smtpTransport = nodemailer.createTransport("SMTP", {
        service : "Gmail",
        auth    : {
            user : emailConfig.user,
            pass : emailConfig.pass
        }
    });

    self.sendMail = function (recipients, subject, body, attachments, callback) {

        var mailOptions = {
            from        : emailConfig.from, // sender address
            subject     : subject,
            to          : recipients,
            html        : body,
            attachments : attachments
        };

        smtpTransport.sendMail(mailOptions, callback);

    };
}

module.exports = new Mailer();