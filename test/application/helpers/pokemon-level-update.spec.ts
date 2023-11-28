import { PokemonLevelUpdateServiceInstance } from '../../../src/application/helpers/pokemon-level-update-service-instance'
import { ProcessPokemonLevelUpdateService } from '@/core/services/process-pokemon-level-update-service'
import { expect } from "chai";

describe(PokemonLevelUpdateServiceInstance.name, () => {
  it('should create a pokémon level update instance', () => {
    expect(PokemonLevelUpdateServiceInstance.getInstance()).to.be.instanceOf(ProcessPokemonLevelUpdateService);
  })
})
