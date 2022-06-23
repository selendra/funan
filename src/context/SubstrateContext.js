import React from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { keyring as Keyring } from "@polkadot/ui-keyring";
import { selendra } from "../constants/node";

const Connected = localStorage.getItem('current-account');

const initialState = {
  // These are the states
  socket: selendra.testnet,
  keyring: null,
  keyringState: null,
  api: null,
  apiError: null,
  apiState: null,
  currentAccount: null,
  consts: {
    expectedBlockTime: 0,
    existentialDeposit: 0
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'CONNECT_INIT':
      return { ...state, apiState: 'CONNECT_INIT' }
    case 'CONNECT':
      return { ...state, api: action.payload, apiState: 'CONNECTING' }
    case 'CONNECT_SUCCESS':
      return { ...state, apiState: 'READY' }
    case 'CONNECT_ERROR':
      return { ...state, apiState: 'ERROR', apiError: action.payload }
    case 'LOAD_KEYRING':
      return { ...state, keyringState: 'LOADING' }
    case 'SET_KEYRING':
      return { ...state, keyring: action.payload, keyringState: 'READY' }
    case 'KEYRING_ERROR':
      return { ...state, keyring: null, keyringState: 'ERROR' }
    case 'SET_CURRENT_ACCOUNT':
      return { ...state, currentAccount: action.payload }
    case 'SET_CONSTS':
      return { ...state, consts: action.payload}
    default:
      throw new Error(`Unknown type: ${action.type}`)
  }
}

// connect to node
const connect = (state, dispatch) => {
  const { apiState, socket } = state;
  // We only want this function to be performed once
  if (apiState) return;

  dispatch({ type: 'CONNECT_INIT' });

  const provider = new WsProvider(socket);
  const _api = new ApiPromise({ provider });
  
  // Set listeners for disconnection and reconnection event.
  _api.on('connected', () => {
    dispatch({ type: 'CONNECT', payload: _api });
    // `ready` event is not emitted upon reconnection and is checked explicitly here.
    _api.isReady.then(_api => {
      dispatch({ type: 'CONNECT_SUCCESS' });
    });
    console.log(`Connected socket: ${socket}`);
  });
  _api.on('ready', () => dispatch({ type: 'CONNECT_SUCCESS' }));
  _api.on('error', err => dispatch({ type: 'CONNECT_ERROR', payload: err }));
}

// Loading accounts from browser
const loadAccounts = (state, dispatch) => {
  dispatch({ type: 'LOAD_KEYRING' });
  
  const asyncLoadAccounts = async () => {
    try {
      Keyring.loadAll({ ss58Format: 204, type: 'sr25519' });
      dispatch({ type: 'SET_KEYRING', payload: Keyring });

      // Get current active account
      if(Connected) {
        dispatch({ 
          type: 'SET_CURRENT_ACCOUNT', 
          payload: getKeypair(Connected) 
        });
      }
    } catch(e) {
      console.error(e);
      dispatch({ type: 'KEYRING_ERROR' });
    }
  }
  asyncLoadAccounts();
}

const fetchConsts = async (state, dispatch) => {
  const { apiState, api } = state;
  if(apiState !== 'READY' || !api) return;
  try {
    const promise = await Promise.all([ 
      await api.consts.babe.expectedBlockTime,
      await api.consts.balances.existentialDeposit
    ]);
    dispatch({ 
      type: 'SET_CONSTS', 
      payload: {
        expectedBlockTime: promise[0],
        existentialDeposit: promise[1]
      }
    });
  } catch(error){
    
  }
}

function getKeypair(addr) {
  try {
    return Keyring.getPair(addr);
  } catch (error) {
    // if account removed return null
    return null;
  }
}

let keyringLoadAll = false;

const SubstrateContext = React.createContext();
const SubstrateContextProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  connect(state, dispatch);

  React.useEffect(() => {
    const { apiState, keyringState } = state
    if (apiState === 'READY' && !keyringState && !keyringLoadAll) {
      keyringLoadAll = true;
      loadAccounts(state, dispatch);
      // keyringLoadAll = false
      fetchConsts(state, dispatch);
    }
  }, [state, dispatch]);

  function setCurrentAccount(account) {
    localStorage.setItem('current-account', account.address);
    dispatch({ type: 'SET_CURRENT_ACCOUNT', payload: account });
  }
  
  return (
    <SubstrateContext.Provider 
      value={{ 
        state, 
        dispatch, 
        loadAccounts, 
        setCurrentAccount 
      }}
    >
      {children}
    </SubstrateContext.Provider>
  )
}

const useSubstrate = () => React.useContext(SubstrateContext);
const useSubstrateState = () => React.useContext(SubstrateContext).state;

export { SubstrateContextProvider, useSubstrate, useSubstrateState };