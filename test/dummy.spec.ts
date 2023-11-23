import chai, { expect } from 'chai'

describe('/Dummy', () => {
  it('Initial dummy test', done => {
    const ok = 'ok'
    expect(ok).to.be.equal('ok')
    done()
  })
})
