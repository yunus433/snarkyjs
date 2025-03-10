import { Field, Bool, UInt32, UInt64, Sign } from './field-bigint.js';
import { PublicKey } from './curve-bigint.js';
import { derivedLeafTypes } from './derived-leaves.js';
import { createEvents } from '../lib/events.js';
import { Poseidon, Hash, packToFields } from './poseidon-bigint.js';

export { PublicKey, Field, Bool, AuthRequired, UInt64, UInt32, Sign, TokenId };

export {
  Events,
  Actions,
  ZkappUri,
  TokenSymbol,
  ActionState,
  ReceiptChainHash,
  StateHash,
};

type AuthRequired = {
  constant: Bool;
  signatureNecessary: Bool;
  signatureSufficient: Bool;
};
type TokenId = Field;
type StateHash = Field;
type TokenSymbol = { symbol: string; field: Field };
type ZkappUri = { data: string; hash: Field };

const { TokenId, StateHash, TokenSymbol, AuthRequired, ZkappUri } =
  derivedLeafTypes({ Field, Bool, Hash, packToFields });

type Event = Field[];
type Events = {
  hash: Field;
  data: Event[];
};
type Actions = Events;
const { Events, Actions } = createEvents({ Field, Poseidon });

type ActionState = Field;
const ActionState = {
  ...Field,
  emptyValue: Actions.emptyActionState,
};

type ReceiptChainHash = Field;
const ReceiptChainHash = {
  ...Field,
  emptyValue: () => Hash.emptyHashWithPrefix('CodaReceiptEmpty'),
};
