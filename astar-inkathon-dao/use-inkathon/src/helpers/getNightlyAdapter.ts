import { NightlyConnectAdapter } from '@nightlylabs/wallet-selector-polkadot'
import { getWebsiteIcon } from './getWebsiteIcon'

// In the case of the optional library, types are not available
let _adapter: any | undefined
export const getNightlyConnectAdapter = async (
  appName?: string,
  appIcon?: string,
  appOrigin?: string,
  persisted = true,
) => {
  if (_adapter) return _adapter

  try {
    const name = appName || window?.location.hostname
    const icon = appIcon || (await getWebsiteIcon(window?.origin))
    const description = appOrigin || window?.origin

    _adapter = await NightlyConnectAdapter.build(
      {
        appMetadata: { name, icon, description },
        network: 'AlephZero',
      },
      persisted,
    )
  } catch (e) {
    return undefined
  }

  return _adapter
}
