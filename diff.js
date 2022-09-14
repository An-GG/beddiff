#!/usr/bin/env node
var fs = require('fs');
var proc = require('child_process');

function toArr(csv) {
	let lines = csv.split('\n')
	let grid = [];
	for (let l of lines) {
		let pts = l.split(',');
		if (pts.length < 2) { continue; }
		let numeric_pts = [];
		for (let pt of pts) {
			numeric_pts.push(parseFloat(pt));
		}
		grid.push(numeric_pts);
	}
	return grid;
}

function grid_diff(a, b) {
	let grid = []
	let rN = 0;
	for (let row of a) {
		let row_of_b = b[rN];
		let pN = 0;
		let new_row = [];
		for (let point of row) {
			let point_of_b_row = row_of_b[pN];
			let diff_point = point - point_of_b_row;
			new_row.push(diff_point);
			pN++;
		}
		grid.push(new_row);
		rN++;
	}
	return grid;
}

function text_grid(g) {
	let str = '';
	for (let row of g) {
		//str += '#*# 	';
		str += row.join(', ');
		str += '\n';
	}
	return str;
}

function make_page_from_text_grid(text_grid, name) {
	let magic_str =  '###REPLACE_HERE###'
	let magic_title_str = '###REPLACE_TITLE###'
	let index = fs.readFileSync('plot/index.html').toString();
	index = index.replace(magic_str, text_grid);
	index = index.replace(magic_title_str, name);
	let page_path = 'plot/'+name+'.html';
	fs.writeFileSync(page_path, index);
	return page_path;
}

function main() {
	let a = process.argv[2];
	let b = process.argv[3];

	let n_a = a.split('/').pop().split('.')[0];
	let n_b = b.split('/').pop().split('.')[0];
	let name = 'DIFF_OF_'+n_a+'_MINUS_'+n_b;

	let csv_a = fs.readFileSync(a).toString();
	let csv_b = fs.readFileSync(b).toString();

	let txt = text_grid(grid_diff(toArr(csv_a), toArr(csv_b)));
	let path = make_page_from_text_grid(txt, name);

	console.log(txt);
	if (process.platform == 'darwin') {
		proc.spawn('open', [path]);
	} else {
		proc.spawn('xdg-open', [path]);
	}
}


main();
