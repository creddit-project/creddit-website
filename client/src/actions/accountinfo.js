import {
    getAccountInfo
} from '../util/api';

export const getAccountInfo = username => async dispatch => {
    const accountInfo = await getAccountInfo(username);

    dispatch(accountInfo);
}
