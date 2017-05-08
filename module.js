module.exports.chatbot = {
    "username": "ChatBot",
    "timestamp": "",
    "text": "Hello there"
};

module.exports.randomSentence = function randomSentence() {
    var x = Math.random();
    return x<0.5?"Hej":"Halloj";
};