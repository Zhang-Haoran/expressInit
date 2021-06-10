module.exports = (error, req, res, next) => {
  //对error类型检测,可以console log error来找到错误属性
  if (error.name === "ValidationError") {
    if (process.env.NODE_ENV === "production") {
      const { details } = error;
      const errMsg = details.map((eachErrorDetail) => {
        return {
          message: eachErrorDetail.message,
        };
      });
      return res.status(400).json(errMsg);
    } else {
      res.status(400).json(error);
    }
  }
  //catch other errors
  //winston 通知监控平台

  return res.status(500).send("Something unexpected happened");
};
