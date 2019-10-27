let fs = require('fs');
let os = require('os');
let path = require('path');

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

let homeDir = os.homedir();
let configPath = path.join(homeDir, '.config/jav-runner', 'config.json');
if(fs.existsSync(configPath)) {
    let str = fs.readFileSync(configPath);
    let config = JSON.parse(str);
    exp.proxy = config.proxy;
    exp.rename = config.rename;
}


function init() {
    return exp;
}

export default exp