#!/usr/bin/env node

var fs = require('fs');

function main() {
    let fname = process.argv[2];
    let f = fs.readFileSync(fname).toString();
    let blobs = f.split('#*# [bed_mesh');
    blobs.shift();

    for (let b of blobs) {
        let name = b.split(']')[0];
        let pts_lns = b.split('#*# points =')[1].split('\n')

        let lines_keep = [];
        for (let l of pts_lns) {
            if (l.includes('=')) { break; }
            lines_keep.push(
                l.replace('#*#', '').trimStart()
            );
        }
    
        fs.writeFileSync('./'+name+'.csv', lines_keep.join('\n'));
        console.log(name);
    }
}
main();
