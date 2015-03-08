
// TODO: This needs to be removed when modules are auto-shimmed when lifting code from a nodejs codebase.
window.Buffer = require("../node_modules/buffer-browserify/index").Buffer;

const FS = require("q-io/fs");
const FS_MOCK = require("q-io/fs-mock");


var mockFs = FS_MOCK({
    "a": {
        "b": {
            "c.txt": "Content of a/b/c.txt"
        }
    }
});

exports.client = function() {

	console.log("hello world from client");

	mockFs.read("a/b/c.txt").then(function (data) {

		console.log("Content of c.txt", data);

	}).fail(console.error);

}
