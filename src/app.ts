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
    console.log(program, program.opts(), program.R, program.args);
    // let runner = new Runner();
    // runner.run(args[0])
}

main(process.argv);