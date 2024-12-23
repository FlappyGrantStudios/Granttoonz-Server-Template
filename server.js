const express = require("express")
const fs = require("fs")
const path = require("path")
const cors = require("cors")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 7024

let currentFrame = 1

app.use(cors())

app.get("/", (req, res) => {
    res.writeHead(200, {
        "Content-Type": "multipart/x-mixed-replace; boundary=frame",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Access-Control-Allow-Origin": "*",
    })

    const sendFrame = () => {
        const framesDir = path.join(__dirname, "data", "frames")
        const frameFiles = fs.readdirSync(framesDir)

        if (frameFiles.length > 0) {
            const sortedFrameFiles = frameFiles
                .filter(file => file.startsWith("frame"))
                .sort((a, b) => parseInt(a.replace(/\D/g, "")) - parseInt(b.replace(/\D/g, "")))
            const totalFrames = sortedFrameFiles.length

            if (currentFrame > totalFrames) {
                currentFrame = 1
            }

            const currentFrameFile = sortedFrameFiles[currentFrame - 1]
            const framePath = path.join(framesDir, currentFrameFile)
            const frame = fs.readFileSync(framePath)

            res.write(`--frame\r\nContent-Type: image/jpeg\r\n\r\n`)
            res.write(frame)
            res.write("\r\n")
            currentFrame++
        } else {
            console.warn("No frames found in", framesDir)
        }
    }

    const interval = setInterval(() => {
        if (res.writableEnded) {
            clearInterval(interval)
            return
        }

        sendFrame()
    }, 1000 / 24)

    req.on("close", () => clearInterval(interval))
})

app.get("/meta/:property", (req, res) => {
    const { property } = req.params

    try {
        const meta = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "meta.json"), "utf8"))

        if (property in meta) {
            res.status(200).json(meta[property])
        } else {
            res.status(404).send(`Meta property "${property}" not found on this channel!`)
        }
    } catch (error) {
        console.error("Error reading or parsing meta.json:", error)
        res.status(500).send("Server error reading the meta data.")
    }
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
