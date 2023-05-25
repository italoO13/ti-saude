import express from 'express'

const app = express()
app.use(express.json())

const PORT = 3000

const server = app.listen(PORT, () => {
  console.log(
  `Server is running on PORT: ${PORT}`
  )
})

export default server
