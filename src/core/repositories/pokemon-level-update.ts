import { PokemonLevelUpdate } from '@/data-providers/dtos/pokemon-level-update'

export interface IPokemonLevelUpdateRepository {
  update(dto: PokemonLevelUpdate): Promise<void>
}
