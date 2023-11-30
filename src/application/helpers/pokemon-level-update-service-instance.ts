import { PokemonLevelUpdateService } from '../../../src/core/services/pokemon-level-update-service'
import { PokemonLevelUpdateRepository } from '../../../src/data-providers/repositories/pokemon-level-update-repository'

export class PokemonLevelUpdateServiceInstance {
  private static instance: PokemonLevelUpdateService

  static getInstance(): PokemonLevelUpdateService {
    if (!this.instance) {
      const repo = new PokemonLevelUpdateRepository()
      this.instance = new PokemonLevelUpdateService(repo)
    }

    return this.instance
  }
}
