var nodemailer = require("nodemailer");
var _ = require('underscore');
var moment = require('moment');
var emailConfig = require('config').Email;

function Mailer() {

    var self = this;

    // create reusable transport method (opens pool of SMTP connections)
    var smtpTransport = nodemailer.createTransport({
        service : "gmail",
        auth    : {
            user : emailConfig.user,
            pass : emailConfig.pass
        }
    });

    self.sendMail = function (from, recipients, subject, body, attachments, callback) {

        var mailOptions = {
            from        : from,
            subject     : subject,
            to          : recipients,
            html        : body,
            attachments : attachments
        };

        smtpTransport.sendMail(mailOptions, callback);

    };
}

module.exports = new Mailer();