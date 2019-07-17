import * as fs from "fs";
import * as Crawler from "crawler"

let crawler = new Crawler();
export async function getDocumentMock(html: String): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        let task = {
            html: html,
            callback: function(error, res, done) {
                if(error) {
                    reject(error)
                } else {
                    resolve(res.$)
                }
                done();
            }
        };
        crawler.queue(task)
    });
}

export async function getDocumentMockByFile(filePath: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            let task = {
                html: data,
                callback: function(error, res, done) {
                    if(error) {
                        reject(error)
                    } else {
                        resolve(res.$)
                    }
                    done();
                }
            };
            crawler.queue(task)
        });
    });
}