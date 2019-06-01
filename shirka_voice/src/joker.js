(function(){
    var say = require("say");

    console.log("saying stuff..");
    say.speak('Hello, how are you today?', (err) => {
        if (err) {
            return console.error(err);
        }
    
        console.log('Text has been spoken.');
    });
})();