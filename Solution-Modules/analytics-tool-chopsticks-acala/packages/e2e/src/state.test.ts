import { describe, expect, it } from 'vitest'

import { api, env, expectHex, expectJson, setupApi } from './helper'

setupApi(env.mandala)

describe('state rpc', () => {
  it('getXXX', async () => {
    expectJson(await api.rpc.state.getRuntimeVersion()).toMatchSnapshot()
    expectHex(await api.rpc.state.getMetadata(env.mandala.blockHash)).toMatchSnapshot()
    const genesisHash = await api.rpc.chain.getBlockHash(0)
    expect(await api.rpc.state.getMetadata(genesisHash)).to.not.be.eq(await api.rpc.state.getMetadata())
  })

  it.todo('subscribeRuntimeVersion')
})
