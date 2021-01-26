const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
// const session = require("express-session")
const schemeRouter = require("./scheme/scheme-router")



const server = express()
const port = process.env.PORT || 8080




server.use(express.json());
server.use(helmet());
server.use(cors());







server.use(schemeRouter)
server.use((err, req, res, next) => {
	console.log(err)

	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})
