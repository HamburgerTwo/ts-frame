import { AnyAction } from 'redux';
import {
    GOTOURL_ACTION,
} from '../constants'
import { Comm, CommAction } from '../types/comm'

export interface GoToUrlAction extends AnyAction {
    type: GOTOURL_ACTION
    payload: Comm
}

export type CommActions = GoToUrlAction

export const goToUrlAction = (url: string) => (dispatch: CommAction) => (
    dispatch({
        type: GOTOURL_ACTION,
        payload: {
            url
        }
    })
)