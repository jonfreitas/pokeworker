import path from 'path'
import { Engine, logger } from '@sdk12/dataserver'
import { IPokemonLevelUpdateRepository } from '../../core/repositories/pokemon-level-update'
import { PokemonLevelUpdate } from '../dtos/pokemon-level-update'

type GrpcException = {
  code: number
  message: string
  details: string
}
type Client = ReturnType<Engine['setClient']>

// const { POKEMON_LEVEL_UPDATE_SERVER_IP } = process.env
const POKEMON_LEVEL_UPDATE_SERVER_IP = '0.0.0.0:50051'

const protoDirPath = path.join('./', 'node_modules', '@sdk12', 'protos')
const protoPath = path.join(
  protoDirPath,
  'pokemon',
  'pokemon.proto'
)
const engineDataServer = new Engine({
  protos: { keepCase: false },
})

export class PokemonLevelUpdateRepository implements IPokemonLevelUpdateRepository {
  proto: string = path.join(__dirname, '..', '..', 'protos', 'pokemon.proto')

  private readonly client: Client

  constructor() {
    this.client = engineDataServer.setClient(POKEMON_LEVEL_UPDATE_SERVER_IP, protoPath)
  }

  update(dto: PokemonLevelUpdate): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.client.PokemonLevelUpdate(
          dto,
          (error: GrpcException, response: void) => {
            if (error) {
              reject(error)
            }
            resolve(response)
          }
        )
      } catch (error) {
        logger.error(error)
        reject(error)
      }
    })
  }
}
