import { PokemonLevelUpdateService } from '../../core/services/pokemon-level-update'
import { PokemonLevelUpdateRepository } from '../../data-providers/repositories/pokemon-level-update'

export class PokemonLevelUpdateSingleton {
  private static instance: PokemonLevelUpdateService

  static getInstance(): PokemonLevelUpdateService {
    if (!this.instance) {
      const repo = new PokemonLevelUpdateRepository()
      this.instance = new PokemonLevelUpdateService(repo)
    }

    return this.instance
  }
}
