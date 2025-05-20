'use strict'
const captchaController = require('../controllers/captcha.controller');

module.exports = (app) => {
    app.route('/api/captcha')
        .get(captchaController.generateCaptcha);
}
