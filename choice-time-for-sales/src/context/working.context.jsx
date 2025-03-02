import React, { createContext, useContext, useState, useEffect } from 'react';
import { DataContext } from './fetchData.context'; // 确保路径和文件名正确
import { TimerContext } from './timer.context'; // 确保路径和文件名正确
import dayjs from 'dayjs';

export const WorkingContext = createContext({
	weekWork: null,
	handlerWorking: () => {},
});

export const WorkingProvider = ({ children }) => {
	const { data } = useContext(DataContext);
	const { timer } = useContext(TimerContext);
	const [weekWork, setWeekWork] = useState(null);

	const resetWorking = () => {
		if (!data) return;
		const now = dayjs(new Date()).add(1, 'd').format('YYYY-MM-DD');

		const temp = Array.from({ length: 7 }, () => []);
		const work = [];
		data.forEach((ele) => {
			const dayDiff = dayjs(ele.date).diff(dayjs(timer), 'day');
			console.log(dayDiff);
			temp[dayDiff].push(ele);
		});
		temp.forEach((ele) => {
			let eleLength = ele.length;
			if (eleLength === 0) return;
			const getWorkingStatus = (time) => ele.some((e) => e?.[time] === 'TRUE');
			console.log(now);
			console.log(ele[0].date);
			work.push({
				date: ele[0].date,
				onwork: [
					{
						time: 1300,
						working: dayjs(ele[0].date).isSame(dayjs(now), 'day')
							? false
							: getWorkingStatus('1300') || getWorkingStatus('1400'),
						isCompleted: false,
					},
					{
						time: 1500,
						working: dayjs(ele[0].date).isSame(dayjs(now), 'day')
							? false
							: getWorkingStatus('1500') || getWorkingStatus('1600'),
						isCompleted: false,
					},
					{
						time: 1700,
						working: getWorkingStatus('1700') || getWorkingStatus('1800'),
						isCompleted: false,
					},
					{
						time: 1900,
						working: getWorkingStatus('1900') || getWorkingStatus('2000'),
						isCompleted: false,
					},
				],
			});
		});
		setWeekWork(work);
		console.log(work);
	};

	const handlerWorking = (date, time) => {
		if (!weekWork) return;
		const newWorking = weekWork.map((ele) => {
			if (dayjs(date).isSame(dayjs(ele.date), 'day')) {
				// 僅比對日期
				return {
					...ele,
					onwork: ele.onwork.map((e) =>
						e.time === time ? { ...e, isCompleted: !e.isCompleted } : e
					),
				};
			}
			return ele;
		});
		setWeekWork(newWorking);
	};

	useEffect(() => {
		if (!data) setWeekWork(null);
		resetWorking();
	}, [data]);

	return (
		<WorkingContext.Provider value={{ weekWork, handlerWorking }}>
			{children}
		</WorkingContext.Provider>
	);
};
