import { IPokemonLevelUpdate } from '@/data-providers/dtos/pokemon-level-update'

export interface IPokemonLevelUpdateRepository {
  update(dto: IPokemonLevelUpdate): Promise<void>
}
