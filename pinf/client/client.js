
const Q_IO = require("./q-io-client");


exports.main = function () {

	console.log("main!", Q_IO);

	Q_IO.client();

}
