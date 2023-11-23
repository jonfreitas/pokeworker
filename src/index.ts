import { Engine, WorkerConfig } from '@sdk12/worker'
import { Runners } from './entry-point/runners'

// const { BROKER_AMQP_RABBITMQ } = process.env

const config: WorkerConfig = {
  clientId: 'poke-worker',
  connections: [
    {
      name: 'poke-worker',
      type: 'amqp',
      // broker: BROKER_AMQP_RABBITMQ,
      broker: 'amqp://guest:guest@0.0.0.0:5672',
    },
  ],
}

Engine.configure(config).loadRunners(Runners).start()
