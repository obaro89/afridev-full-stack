import React from 'react';
import { useSelector } from 'react-redux';

const Alert = () => {
	const alertState = useSelector((state) => state.alert);
	return (
		alertState !== null &&
		alertState.length > 0 &&
		alertState.map((alert) => (
			<div
				key={alert.payload.id}
				className={'alert alert-' + alert.payload.alertType}
			>
				{alert.payload.msg}
			</div>
		))
	);
};

export default Alert;
