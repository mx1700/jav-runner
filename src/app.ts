import {Runner} from "./Runner";


function main(args) {
    let runner = new Runner();
    runner.run(args[0])
}

main(process.argv.splice(2));