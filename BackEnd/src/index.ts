import * as express from "express"
import { Request, Response } from "express"


const app = express()

app.get("/", (req: Request, res: Response) => {
  res.send('hello mark, king of zap zap')
})

app.listen(3000, () => console.log("listening on port 3000!"))