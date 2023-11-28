import path from 'path'
import { Engine, logger } from '@sdk12/dataserver'
import { IPokemonLevelUpdateRepository } from '@/core/repositories/pokemon-level-update'
import { IPokemonLevelUpdate } from '../dtos/pokemon-level-update'

type GrpcException = {
  code: number
  message: string
  details: string
}
type Client = ReturnType<Engine['setClient']>

const { POKEMON_LEVEL_UPDATE_SERVER_IP } = process.env

const protoDirPath = path.join('./', 'src', 'protos')
const protoPath = path.join(
  protoDirPath,
  'pokemon.proto'
)
const engineDataServer = new Engine({
  protos: { keepCase: false },
})

export class PokemonLevelUpdateRepository implements IPokemonLevelUpdateRepository {
  private readonly client: Client

  constructor() {
    this.client = engineDataServer.setClient(POKEMON_LEVEL_UPDATE_SERVER_IP, protoPath)
  }

  update(dto: IPokemonLevelUpdate): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.client.updateLevelPokemon(
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
