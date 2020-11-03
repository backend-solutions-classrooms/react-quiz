// * Use environment variables to perform read/write to result files
// * process.env.TEST_FILE_NAME is the name of THIS file (the unit tests you're writing - use it as compile command)
// * process.env.USER_CODE_DIR is the directory path of user's code. Use it to import/run user specific code
// * process.env.PUBLIC_PORT is the publicly accessible port on localhost for user's server. Use it to perform HTTP requests to user server
// * process.env.IO_TEST_OUTPUT_FILE is the name of the file where results of IO tests should be put
// * process.env.UNIT_TEST_OUTPUT_FILE is the name of the file where results of UNIT tests should be put
// * The results file should have a JSON array with ONLY "true" or "false" values (booleans) as elements having one-to-one correspondance to challenges you design

const fs = require('fs')
const puppeteer = require('puppeteer')
const assert = require('assert')
const path = require('path')
const spawn = require('child_process').spawn

const retry = (fn, ms) =>
	new Promise((resolve) => {
		fn()
			.then(resolve)
			.catch(() => {
				setTimeout(() => {
					console.log('retrying...')
					retry(fn, ms).then(resolve)
				}, ms)
			})
	})

// const userFile = require(path.resolve(process.env.USER_CODE_DIR, 'script.js'))
;(async () => {
	const results = []
	spawn('bash', ['-c', `cd ${process.env.USER_CODE_DIR} && static-server -p 1337`])
	const browser = await puppeteer.launch({
		executablePath: '/usr/bin/google-chrome',
		headless: true,
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--disable-dev-shm-usage',
			'--disable-accelerated-2d-canvas',
			'--no-first-run',
			'--no-zygote',
			'--single-process',
			'--disable-gpu'
		]
	})
	page = await browser.newPage()
	await retry(() => page.goto('http://localhost:' + process.env.PUBLIC_PORT), 1000)

	// t1
	try {
		const test = await page.evaluate((_) => {
			const author = document.getElementById('author')
			const title = document.getElementById('title')
			const isbn = document.getElementById('isbn')
			author.value = 'yesyes'
			title.value = 'sdfdsf'
			isbn.value = 'waeawe'

			addABook({ preventDefault: () => 0 })

			return (
				document.querySelector('.alert-success').innerText.toLowerCase().trim() ===
				'book added'
			)
		})
		assert(test)
		results.push(true)
	} catch (error) {
		results.push(false)
	}

	// start testing user code

	fs.writeFileSync(process.env.UNIT_TEST_OUTPUT_FILE, JSON.stringify(results))
	process.exit(0)
})()
