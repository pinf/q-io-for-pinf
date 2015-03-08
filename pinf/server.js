
const PATH = require("path");
const PINF = require("pinf-for-nodejs");
const EXPRESS = require("express");
const COMPRESSION = require("compression");
const SEND = require("send");
const HTTP = require("http");

const PORT = process.env.PORT || 8080;

return PINF.main(function(options, callback) {

	var app = EXPRESS();

	app.use(COMPRESSION());

	// TODO: This needs to be removed when modules are auto-shimmed when lifting code from a nodejs codebase.
	app.get(/^\/node_modules\/(.+)$/, function (req, res, next) {
		return SEND(req, req.params[0], {
			root: PATH.join(__dirname, "node_modules")
		}).on("error", next).pipe(res);
	});

	app.get(/^\/lib\/pinf-loader-js\/(.+)$/, function (req, res, next) {
		return SEND(req, req.params[0], {
			root: PATH.join(__dirname, "node_modules/pinf-for-nodejs/node_modules/pinf-loader-js")
		}).on("error", next).pipe(res);
	});

	app.get(/^\/(client.+)$/, PINF.hoist(PATH.join(__dirname, "client/program.json"), options.$pinf.makeOptions({
		debug: true,
		verbose: true,
		PINF_RUNTIME: "",
        $pinf: options.$pinf
    })));

	app.get(/^(\/.*)$/, function (req, res, next) {
		var path = req.params[0];		
		if (path === "/") path = "/index.html";
		return SEND(req, path, {
			root: PATH.join(__dirname, "server")
		}).on("error", next).pipe(res);
	});

	HTTP.createServer(app).listen(PORT)

	// Wait for debug output from `PINF.hoist()` to finish.
	setTimeout(function() {
		console.log("Open browser to: http://localhost:" + PORT + "/");
	}, 2 * 1000);

}, module);

