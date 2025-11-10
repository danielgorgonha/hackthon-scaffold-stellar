import * as Client from 'balloonfly';
import { rpcUrl } from './util';

export default new Client.Client({
  networkPassphrase: 'Standalone Network ; February 2017',
  contractId: 'CDPV7EUHDFAOVYQA4OPD3COI3WJ4SEWEFERFPELV6JVSEAVO3ULIEBX5',
  rpcUrl,
  allowHttp: true,
  publicKey: undefined,
});
