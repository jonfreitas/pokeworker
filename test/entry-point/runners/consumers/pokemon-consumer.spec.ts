import {
  PokemonConsumer,
  pokemonConsumer,
} from '@/entry-point/runners/consumers/pokemon-consumer'
import sinon from 'sinon'
import mockMessage from 'test/mocks/message.json'
import { PokemonLevelUpdateServiceInstance } from '@/application/helpers/pokemon-level-update-service-instance'
import chaiAsPromised from 'chai-as-promised'
import chai from 'chai'
import { PokemonLevelUpdateService } from '@/core/services/pokemon-level-update-service'

chai.use(chaiAsPromised)

describe(PokemonConsumer.name, () => {
  const sandbox = sinon.createSandbox()
  const payload = Buffer.from(JSON.stringify(mockMessage))
  let pokemonLevelUpdateSendMessageService: PokemonLevelUpdateService
  let pokemonLevelUpdateSendMessageServiceStub: sinon.SinonStub

  beforeEach(() => {
    pokemonLevelUpdateSendMessageService = PokemonLevelUpdateServiceInstance.getInstance()
    pokemonLevelUpdateSendMessageServiceStub = sandbox.stub(pokemonLevelUpdateSendMessageService, 'execute').resolves()
  })

  afterEach(() => sandbox.restore())

  it('should decode incoming message and call service with decoded pokémon level update message', async () => {
    await pokemonConsumer.listener(payload, mockMessage)
    sinon.assert.calledOnce(pokemonLevelUpdateSendMessageServiceStub)
    sinon.assert.calledOnceWithExactly(pokemonLevelUpdateSendMessageServiceStub, mockMessage)
  })

  it('should update status when the send pokémon level update message fails', async () => {
    pokemonLevelUpdateSendMessageServiceStub.reset()
    pokemonLevelUpdateSendMessageServiceStub.rejects()

    await chai.expect(pokemonConsumer.listener(payload, mockMessage)).to.be.rejected
  })
})
