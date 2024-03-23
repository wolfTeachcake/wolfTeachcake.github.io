import { createContext, useState, useEffect } from 'react';
import dayjs from 'dayjs';

export const TimerContext = createContext({
	timer: null,
	setTimer: () => {},
});

export const TimerProvider = ({ children }) => {
	const [timer, setTimer] = useState(null);
	const value = { timer, setTimer };
	return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
};
