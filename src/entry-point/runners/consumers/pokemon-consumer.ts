import {
  logger,
  Message,
  Runner,
  RunnerTypes,
  Subscription,
} from '@sdk12/worker'
import { IPokemonLevelUpdate } from '../../../dtos/pokemon-level-update'
import { ProcessPokemonLevelUpdateService } from '../../../core/services/processPokemonLevelUpdateService'
import { PokemonIdNotFoundException } from '../../../core/errors/pokemon-id-not-found-exception'
import { InvalidMessageFormatException } from '../../../core/errors/invalid-message-format-exception'

function getFormattedMessageOrFail(message: Message): IPokemonLevelUpdate {
  try {
    return JSON.parse(JSON.parse(message.Body).Message) as IPokemonLevelUpdate
  } catch (error) {
    throw new InvalidMessageFormatException('Invalid message format')
  }
}

export class PokemonConsumer implements Runner {
  type: RunnerTypes = RunnerTypes.CONSUMER

  service = 'poke-worker'

  groupId = 'poke-consumer-group'

  subscription: Subscription = {
    topic: 'pokemon.level.update',
    queue: 'pokemon-level-update-send',
    deadLetterQueue: {
      exchange: 'pokemon-level-update:dead-letter-exchange',
      routingKey: '#',
      queue: 'pokemon-level-update-send-error',
    },
    requeue: {
      attempts: 10,
      defer: 60000,
    },
    prefetch: 1,
  }

  async listener(payload: Buffer, message: Message): Promise<void> {
    try {
      const pokemonLevelUpdateByQueue = getFormattedMessageOrFail(message)

      await new ProcessPokemonLevelUpdateService(pokemonLevelUpdateByQueue).execute()

      logger.debug('POKEMON_LEVEL_UPDATE_WORKER_SAVE_MESSAGE:', {
        id: pokemonLevelUpdateByQueue.id,
        level: pokemonLevelUpdateByQueue.level
      })

      logger.debug('POKEMON_LEVEL_UPDATE_WORKER_SAVE_SUCCESS', {
        id: pokemonLevelUpdateByQueue.id,
        level: pokemonLevelUpdateByQueue.level
      })

      return new Promise((resolve) => {
        logger.info(JSON.stringify(payload.toString()))
        logger.info(message)
        resolve()
      })
    } catch (err: unknown) {
      logger.error('POKEMON_LEVEL_UPDATE_WORKER_SAVE_ERROR', {
        err: (err as Error).message,
        payload: JSON.stringify(message),
      })

      if (
        !(err instanceof PokemonIdNotFoundException) &&
        !(err instanceof InvalidMessageFormatException)
      ) {
        throw err
      }
    }
  }
}

const pokemonConsumer = new PokemonConsumer()
export { pokemonConsumer }
