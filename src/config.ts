let fs = require('fs');

let exp = {
    init: init,
    proxy: "",
    rename: {
        template: "${id} [${actors}] [${genres}] (${year})",
        actors_limit: 3,
        genres_limit: 8,
        title_length_limit: 30,
    }
};

let str = fs.readFileSync('./config.json');
let config = JSON.parse(str);
exp.proxy = config.proxy;
exp.rename = config.rename;

function init() {
    return exp;
}

export default exp