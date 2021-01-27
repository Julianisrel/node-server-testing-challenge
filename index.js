const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
// const session = require("express-session")
const schemeRouter = require("./scheme/scheme-router")
const app = express()
const port = process.env.PORT || 8080
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(schemeRouter)
// app.use((err, req, res, next) => {
// 	console.log(err)
//
// 	res.status(500).json({
// 		message: "Something went wrong",
// 	})
// })
const server = app.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})
module.exports = { app, server }
