import express from 'express'
import router from './routes'
import type customError from './utils/customError'

class App {
  public app: express.Express

  constructor () {
    this.app = express()

    this.config()

    this.app.get('/', (req, res) => res.json({ ok: true }))

    this.app.use((err: customError, req: express.Request, res: express.Response, _next: express.NextFunction) => {
      // console.log(err)
      if (isNaN(err.code)) {
        return res.status(500).json({ message: 'internal error' })
      }
      return res.status(err.code).json({ message: err.message })
    })
  }

  private config (): void {
    this.app.use(express.json())
    this.app.use(router)
  }

  public start (PORT: string | number): void {
    this.app.listen(PORT, () => { console.log(`Running on port ${PORT}`) })
  }
}

export { App }

// A execução dos testes de cobertura depende dessa exportação - iniciando
export const { app } = new App()
