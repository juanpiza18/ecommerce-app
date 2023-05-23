import { Store } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import store from "..";

interface StateManagerArgs<T, K> {
  setState: T; // useDipatch --> ejecuta cambios en el estado.
  getState: K; // useSelector --> selecciona slice o parte del estado
}

abstract class StateManager<T, K> implements StateManagerArgs<T, K> {
  abstract getState: K;
  abstract setState: T;
}

// Posibles Estados a gestionar
type GetState = TypedUseSelectorHook<ReturnType<typeof store.getState>>;
type SetState = () => typeof store.dispatch;

class ReduxStateManager extends StateManager<SetState, GetState> {
  _store: Store<typeof store>;
  constructor(pstore: any) {
    super();
    this._store = pstore;
  }

  getState = useSelector;

  setState = useDispatch;
}

class GlobalStateManger {
  private stateManager: StateManager<any, any>;
  constructor(stateManager: StateManager<any, any>) {
    this.stateManager = stateManager;
  }

  getStateManager() {
    return this.stateManager;
  }
}

export const GlobalStateManager = new GlobalStateManger(
  new ReduxStateManager(store)
);

export default GlobalStateManager.getStateManager();
