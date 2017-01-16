/*
The code below will fetch the content from URLs given and write it to files
as part of the first BFF workshop.
Author: Jonathan Melian
*/
var fs = require('fs');
var fetch = require('node-fetch');
var commandLineArgs = require('command-line-args');
var urlString = '-urls';
var outString = '-files';
var urls = [];
var files = [];

var optionDefinitions = [
  { name: 'urls', type: String },
  { name: 'files', type: String }
];
var options = commandLineArgs(optionDefinitions);
urls = options.urls.split(',');
files = options.files.split(',');
urls.forEach(getURL);

function getURL(url, index) {
  fetch (
    url
  ).then (
    function (response) {
      response.text().then(
        function (urlContent) {
          writeOnFile(urlContent, files[index]);
        }
      )
    }
  )
}

function writeOnFile(content, file) {
  fs.writeFile(
    file,
    content,
    function (err) {
    	if (err) return console.log(err);
    }
  );
}
