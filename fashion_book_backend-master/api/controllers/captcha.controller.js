const svgCaptcha = require("svg-captcha");

exports.generateCaptcha = (req, res) => {
  const captcha = svgCaptcha.create();

  // Lưu mã captcha vào session (express-session quản lý sẵn)
  req.session.captcha = captcha.text;
  console.log('req.session.captcha', req.session.captcha)
  // Đặt kiểu nội dung trả về là svg
  res.type("svg");

  // Trả về ảnh captcha dưới dạng svg
  res.status(200).send(captcha.data);
};
