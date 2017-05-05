exports.getUrl = getUrl;

var Promise = require('bluebird');
var Horseman = require("node-horseman");

// Playing with the settings is fun, but here's some sensible defaults
var horseman = new Horseman({
    loadImages: false,
    diskCache: true, // This speeds things up a lot, manual caching would probably be superior
    proxy: "http://158.119.150.18:8080",
    proxyType: "http"
});

// Reads and "parses" an URL
function getUrl(url){
    return new Promise(function(resolve, reject){
        horseman
            .open(url)
            .html()
            .then(function(html){
                resolve({
                    html: html,
                });
            })
            .catch(function(err){
                reject(err);
            });
    });
}

/** HORSEMAN NOTES
    
    I only have a single horseman object here, they can be
     expensive (slow) to create, so I'm just keeping it in
     memory. This would be terrible in production as it
     couldn't handle two requests in parallel! Hah!

    You'll also notice I'm not running horseman.close(),
     doing so would render the horseman useless for
     subsequent requests.

    A nice solution would be to have a pool of horseman
     that can be accessed like so:

    getHorseman()
        .then(function(horseman){
            // ... code here
        })

    Where getHorseman() might: pull an inactive horseman
     from a pool, wait for an active horseman to finish,
     or even add a new horseman to the pool. GC would
     be fun too. You could have methods like
     sendThisHorseToTheKnackerYard() - funny, and arguably
     semantic, but you'd be entering the realm of naming
     inception. Try explaining that to your team in a
     few years.
 */