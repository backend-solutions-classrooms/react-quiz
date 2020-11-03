// const userFile = require(path.resolve(process.env.USER_CODE_DIR, 'script.js'))
;(async () => {
	const results = [true]
	// start testing user code

	fs.writeFileSync(process.env.UNIT_TEST_OUTPUT_FILE, JSON.stringify(results))
	process.exit(0)
})()
