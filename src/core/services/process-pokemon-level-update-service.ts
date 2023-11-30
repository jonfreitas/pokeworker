import { PokemonLevelUpdateServiceInstance } from '../../../src/application/helpers/pokemon-level-update-service-instance'
import { IPokemonLevelUpdate } from '@/dtos/pokemon-level-update'
import { PropertyNotFoundException } from '../errors/property-not-found-exception'

const pokemonLevelUpdateService = PokemonLevelUpdateServiceInstance.getInstance()

export class ProcessPokemonLevelUpdateService {
  public id: string
  public level: number
  public sentMessage: boolean
  public origin: string

  constructor(dto: IPokemonLevelUpdate) {
    this.id = dto.id
    this.level = dto.level
    this.sentMessage = true
    this.origin = 'pokeworker'
    this.validate()
  }

  async execute() {
    this.validate()
    await pokemonLevelUpdateService.execute({
      id: this.id,
      level: this.level,
      sentMessage: this.sentMessage,
      origin: this.origin
    })
  }

  validate() {
    if (!this.id || !this.level) {
      throw new PropertyNotFoundException(`Os campos ${this.id} e ${this.level} são obrigatórios!` )
    }
  }
}
