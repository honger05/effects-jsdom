var list = require('../mocks/list.json')

module.exports = function (app) {
  app.get("/api/v1/topics", function(request, response) {
    response.end("welcome index")
  })
}
