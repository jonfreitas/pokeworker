import sinon from 'sinon'
import chai, { expect } from 'chai'
import { ProcessPokemonLevelUpdateService } from '@/core/services/process-pokemon-level-update-service'
import { PropertyNotFoundException } from '@/core/errors/property-not-found-exception'
import { PokemonLevelUpdateServiceInstance } from '@/application/helpers/pokemon-level-update-service-instance'
import { IPokemonLevelUpdate } from '@/dtos/pokemon-level-update'

import messageMock from '../../mocks/message.json'
import chaiAsPromised from 'chai-as-promised'
import { PokemonLevelUpdateService } from '../../../src/core/services/pokemon-level-update-service'

chai.use(chaiAsPromised)

describe(ProcessPokemonLevelUpdateService.name, () => {
  const sandbox = sinon.createSandbox()
  let dto: IPokemonLevelUpdate = {} as any

  let pokemonLevelUpdateSendMessage: IPokemonLevelUpdate
  let pokemonSendMessageService: PokemonLevelUpdateService
  let sendMessage: ProcessPokemonLevelUpdateService
  let pokemonLevelUpdateSendMessageStub: sinon.SinonStub

  beforeEach(async () => {
    Object.assign(dto, messageMock)

    pokemonLevelUpdateSendMessage = new ProcessPokemonLevelUpdateService(pokemonLevelUpdateSendMessage)
    pokemonSendMessageService = PokemonLevelUpdateServiceInstance.getInstance()
    pokemonLevelUpdateSendMessageStub = sandbox.stub(pokemonSendMessageService, 'execute').resolves()
  })

  afterEach(() => sandbox.restore())

  it('should send the message successfully', async () => {
    await expect(sendMessage.execute()).to.be.fulfilled

    sinon.assert.calledOnce(pokemonLevelUpdateSendMessageStub)
  })

  it('should be rejected when pokémon id is not set', async () => {
    dto.id = undefined as any
    await sendMessage.execute().catch((error) => {
      expect(error.message).to.be.equal(`Os campos ${dto.id} e ${dto.level} são obrigatórios!`)
      expect(error instanceof PropertyNotFoundException).to.be.equal(true)
    })
  })

  it('should be rejected when pokémon level is not set', async () => {
    dto.level = undefined as any
    await sendMessage.execute().catch((error) => {
      expect(error.message).to.be.equal(`Os campos ${dto.id} e ${dto.level} são obrigatórios!`)
      expect(error instanceof PropertyNotFoundException).to.be.equal(true)
    })
  })

  it('should call provider with customData', async () => {
    await sendMessage.execute()

    const { custom } = pokemonLevelUpdateSendMessageStub.args[0][0]

    expect(custom).to.be.deep.equal({
      id: "6564ce8f9ce02dddca8868e7",
      level: 21
    })
  })
})
