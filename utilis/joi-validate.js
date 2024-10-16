function validateRequest(schema) {
  return function (req, res, next) {
    const { error, value } = schema.validate(req.body);
    if (error) {
      res.json(error.details[0].message);
    } else {
      next();
    }
  };
}
module.exports = validateRequest;
