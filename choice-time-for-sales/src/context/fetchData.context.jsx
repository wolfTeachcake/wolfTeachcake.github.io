import React, { useContext, createContext, useState } from 'react';
import { TimerContext } from './timer.context';
import dayjs from 'dayjs';

const apiUrl =
	'https://script.google.com/macros/s/AKfycbwqSIInYo20Qyii6y70Yd_uAvih4ENzqgcdgvO0PuqSWPLEqlJ4uYFeuMH8c9AeMadf/exec';

const ObjectToQueryString = (data) => {
	return Object.keys(data)
		.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
		.join('&');
};

export const DataContext = createContext({
	data: null,
	reload: () => {},
});

export const DataProvider = ({ children }) => {
	const { timer } = useContext(TimerContext);
	const [data, setData] = useState(null);

	const reload = async () => {
		setData(null);
		try {
			const queryString = ObjectToQueryString({
				do: 'load',
				time: dayjs(timer).format('YYYY-MM-DD'),
			});
			const apiUrlWithParams = `${apiUrl}?${queryString}`;
			const response = await fetch(apiUrlWithParams, { method: 'GET', mode: 'cors' });

			if (!response.ok)
				throw new Error(`HTTP error! Status: ${response.status}, 連接GAS失敗`);

			const result = await response.json();
			setData(result.data);
		} catch (error) {
			console.error('錯誤:', error);
			return { success: false, message: error.message };
		}
	};

	const value = { data, reload };
	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
