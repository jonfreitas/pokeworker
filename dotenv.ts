import dotenv from 'dotenv'
import path from 'path'

const pathEnvTest = path.resolve('.env')
export default dotenv.config({ path: pathEnvTest })
