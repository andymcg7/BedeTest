# bedefrontendtest

This is my implementation of the Bede Frontend Developer test, 2016.
To run, extract all of the files and open dist/index.html

I chose to use Angular for this project, as I felt from my previous knowledge (although a little rusty) of the framework it was 
well suited to the task. Using Angular should also help with testing of the code.

For styling inspiration I followed the clean look of the http://bedegaming.com/. From previous experience some betting sites have
cluttered and busy user interfaces and I generally prefer a cleaner look and feel.

To start with, I scaffolded the project using Yeoman and the Angular Generator. I tried where possible to split the code into reusable
services to allow easy testability and code reuse. I was refreshing my knowledge of Angular as I developed, so it is possible I made
some incorrect choices along the way. I made extensive use of the Angular documentation and stackoverflow throughout the process.

The user can customise how the data is presented to them - there is a choice of traditional or decimal odds, and the currency symbol to be used.
Local browser storage is used to mimic how data would be stored on the server for user preferences. Placed bets are also stored in this way.

Additions & modifications I would like to make include greater use of CSS processing, automated testing using Protractor, and use of Gulp instead of Grunt.


## Build & development



Run `grunt` for building and `grunt serve` for preview.

## Testing

NOTE Unit tests are not currently working due to an issue with GET requests being made to access the views.
Running `grunt test` will run the unit tests with karma.
