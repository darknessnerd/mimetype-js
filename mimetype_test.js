//
// mimetype_test.js - tests for mimetype.js module for NodeJS.
//
// @author: R. S. Doiel, <rsdoiel@gmail.com>
// copyright (c) 2012 all rights reserved
//
// Released under New the BSD License.
// See: http://opensource.org/licenses/bsd-license.php
//
// revision: 0.0.2
//

var assert = require('assert'),
  mimetype = require('./mimetype');

console.log("Starting tests [mimetype.js] ...", new Date());

assert.equal(mimetype.lookup("myfile.txt"), 'text/plain', "lookup should return text/plain");
assert.equal(mimetype.set('.exotic', 'x-application/experimental'), true, "set should return true.");
assert.equal(mimetype.lookup("myfile.exotic"), "x-application/experimental", "lookup should return x-application/experimental");
assert.equal(mimetype.del('.exotic'), true, "del() should return true");
assert.equal(mimetype.lookup("myfile.exotic"), false, "lookup(myfile.exotic) should return false now");
ky_cnt = Object.keys(mimetype.catalog).length;
i = 0;
mimetype.forEach(function (ext, mime_type_string) {
	assert.ok(ext, "Should have an ext");
	assert.ok(mime_type_string, "Should have a mime_type string");
	assert.strictEqual(mimetype.catalog[ext], mime_type_string);
	i += 1;
});
assert.equal(ky_cnt, i, "i should equal ky_cnt");

// Test multi-extension set()
assert.equal(mimetype.lookup("test.txt1"), false, "Should not have the .txt1 defined yet.");
assert.equal(mimetype.lookup("test.txt2"), false, "Should not have the .txt2 defined yet.");
assert.equal(mimetype.lookup("test.txt3"), false, "Should not have the .txt3 defined yet.");
mimetype.set(".txt1,.txt2,.txt3", "text/plain");
assert.equal(mimetype.lookup("test.txt1"), "text/plain", "Should have the .txt1 now.");
assert.equal(mimetype.lookup("test.txt2"), "text/plain", "Should have the .txt2 now.");
assert.equal(mimetype.lookup("test.txt3"), "text/plain", "Should  have the .txt3 now.");
assert.equal(mimetype.lookup("this.isNotDefined"), false, "Should not have a mime type defined for this.isNotDefined");
assert.equal(mimetype.lookup("this.isNotDefined", false, "text/plain"), "text/plain", "Should not have a mime type defined for this.isNotDefined");
assert.equal(mimetype.lookup("this.isNotDefined", true, "text/plain"), "text/plain; charset=UTF-8", "Should have a mime type with charset defined for this.isNotDefined: " + mimetype.lookup("this.isNotDefined", true, "text/plain"));
assert.equal(mimetype.lookup("this.isNotDefined", "UTF-8", "text/plain"), "text/plain; charset=UTF-8", "this.isNotDefined should be text/plain;charset=UTF-8: " + mimetype.lookup("this.isNotDefined", "UTF-8", "text/plain"));

assert.equal(mimetype.lookup("README"), "text/plain", "README should return text/plain mime-type.");
assert.equal(mimetype.lookup("manifest"), "text/cache-manifest", "manifest should return text/plain mime-type.");

console.log("Success!", new Date());
