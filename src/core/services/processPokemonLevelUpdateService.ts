import { PokemonLevelUpdateSingleton } from '../../application/singleton/pokemon-level-update'
import { IPokemonLevelUpdate } from '../../dtos/pokemon-level-update'
import { PokemonIdNotFoundException } from '../errors/pokemon-id-not-found-exception'

const pokemonLevelUpdateService = PokemonLevelUpdateSingleton.getInstance()

export class ProcessPokemonLevelUpdateService {
  public id: string
  public level: number

  constructor(dto: IPokemonLevelUpdate) {
    this.id = dto.id
    this.level = dto.level
    this.validate()
  }

  async execute() {
    this.validate()
    await pokemonLevelUpdateService.execute({
      id: this.id,
      level: this.level
    })
  }

  validate() {
    if (!this.id) {
      throw new PokemonIdNotFoundException('Pokemon id is required')
    }
  }
}
