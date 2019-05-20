import { ThunkDispatch } from 'redux-thunk'
import * as Actions from '../actions/comm'
export interface Comm {
    url: string
}

export type CommAction = ThunkDispatch<{
    comm: Comm
  }, {}, Actions.CommActions>