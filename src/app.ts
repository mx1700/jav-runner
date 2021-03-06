#!/usr/bin/env node

import {Runner} from "./Runner";
require('fs.promises');
const program = require('commander');

function main(args) {
    program
        .version('1.0.1')
        .option('-r', '处理文件夹下所有子文件和目录')
        .option('-d, --debug', '输出调试信息');

    program.parse(args);

    let runner = new Runner();
    if(program.R) {
        let dir = program.args[0];
        runner.run(dir)
    } else {
        runner.runFiles(program.args);
    }
}

main(process.argv);