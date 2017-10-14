
const tar = require('tar')
const fs = require('fs')

let remaining = 0

const parser = new tar.Parse()
parser.on('entry', entry => {
	++remaining;
	if(entry.size === 0){
		console.log('ZERO SIZED ENTRY: ' + entry.path)
	}
	entry.on('data', data => {
	})
	entry.on('end', () => {
		--remaining
		console.log('got entry end: ' + entry.path)
	})
	entry.resume()	
})
parser.on('warn', warning => {
	console.log('warning from tar: ' + warning)
})
parser.on('end', () => {
	console.log('finished, remaining: ' + remaining)
})
fs.createReadStream('archive.tar').pipe(parser)
