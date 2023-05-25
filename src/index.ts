import express from 'express'

class App {
  public app: express.Express

  constructor () {
    this.app = express()

    this.config()

    this.app.get('/', (req, res) => res.json({ ok: true }))

    this.app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
      console.log(err)
      return res.status(500).json({ message: 'internal error' })
    })
  }

  private config (): void {
    this.app.use(express.json())
  }

  public start (PORT: string | number): void {
    this.app.listen(PORT, () => { console.log(`Running on port ${PORT}`) })
  }
}

export { App }

// A execução dos testes de cobertura depende dessa exportação - iniciando
export const { app } = new App()
