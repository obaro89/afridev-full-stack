import * as actionTypes from '../actiontypes/types';
import { v4 as uuidv4 } from 'uuid';

export const setAlert =
	(msg, alertType, timeout = 5000) =>
	(dispatch) => {
		const id = uuidv4();
		dispatch({
			type: actionTypes.SET_ALERT,
			payload: {
				id,
				msg,
				alertType,
			},
		});

		setTimeout(() => {
			dispatch({
				type: actionTypes.REMOVE_ALERT,
				payload: {
					id,
				},
			});
		}, timeout);
	};
