import * as dotenv from 'dotenv'
import path from 'path'

const pathEnvTest = path.resolve('.env')
export default dotenv.config({ path: pathEnvTest })

export function config(arg0: { path: string }) {
    throw new Error('Function not implemented.')
}
