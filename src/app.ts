#!/usr/bin/env node

import {Runner} from "./Runner";
require('fs.promises');

function main(args) {
    let runner = new Runner();
    runner.run(args[0])
}

main(process.argv.splice(2));