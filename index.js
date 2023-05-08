import url from "node:url"
import path from "node:path"
import express from "express"

const dirname = url.fileURLToPath(new URL(".", import.meta.url))
const PORT = 4000
const app = express()

app.use(express.static(path.join(dirname, "public")))

app.listen(PORT, () => {
    console.log(`server start on port ${PORT}`)
})