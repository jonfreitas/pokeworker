import { PokemonLevelUpdate } from '../../data-providers/dtos/pokemon-level-update'
import { IPokemonLevelUpdateRepository } from '../repositories/pokemon-level-update'

export class PokemonLevelUpdateService {
  constructor(
    private readonly pokemonLevelUpdateRepository: IPokemonLevelUpdateRepository
  ) {}

  async execute(pokemonLevelUpdate: PokemonLevelUpdate) {
    await this.pokemonLevelUpdateRepository.update(pokemonLevelUpdate)
  }
}
