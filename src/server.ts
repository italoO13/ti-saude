import { App } from './'
import 'dotenv/config'

const PORT = process.env.BACK_PORT ?? 3001

new App().start(PORT)
