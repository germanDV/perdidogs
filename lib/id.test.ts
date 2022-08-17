import { idGenerator } from './id'

describe('idGenerator', () => {
  it('should generate auto-increment IDs', () => {
    const generateId = idGenerator()
    expect(generateId()).toEqual('1')
    expect(generateId()).toEqual('2')
    expect(generateId()).toEqual('3')
  })

  it('should generate two sets of independend IDs', () => {
    const g1 = idGenerator()
    const g2 = idGenerator()
    expect(g1()).toEqual('1')
    expect(g2()).toEqual('1')
    expect(g1()).toEqual('2')
    expect(g2()).toEqual('2')
    expect(g1()).toEqual('3')
    g2()
    expect(g2()).toEqual('4')
  })
})
