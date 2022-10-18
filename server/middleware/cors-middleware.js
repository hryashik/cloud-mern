function cors(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-type')
  next()
}
module.exports = cors
