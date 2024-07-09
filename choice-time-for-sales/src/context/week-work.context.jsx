import React, { createContext, useContext, useState, useEffect } from 'react';
import { TimerContext } from './timer.context'; // 确保路径和文件名正确
import { DataContext } from './fetchData.context'; // 确保路径和文件名正确
import dayjs from 'dayjs';

export const WeekWorkContext = createContext({
	weekWork: null,
	setWeekWork: () => {},
	lastTime: null,
});

export const WeekWorkProvider = ({ children }) => {
	const { timer } = useContext(TimerContext);
	const { data } = useContext(DataContext);
	const [weekWork, setWeekWork] = useState(null);
	const [lastTime, setLastTime] = useState(null);

	useEffect(() => {
		if (!timer) {
			setWeekWork([]);
			return;
		}

		const weekDates = [...Array(7)].map((_, i) => {
			const date = timer.add(i, 'day');
			const dateString = date.format('YYYY-M-D');

			const fieldPersons = data;

			let dailyWorkTimes = fieldPersons.reduce((acc, person) => {
				Object.entries(person.work_schedules).forEach(([scheduleYearMonth, schedules]) => {
					// 在这里添加年月的判断
					if (date.format('YYYY-M') === dayjs(scheduleYearMonth).format('YYYY-M')) {
						Object.entries(schedules).forEach(([scheduleDate, detail]) => {
							if (dayjs(scheduleDate).isSame(date, 'day')) {
								detail.work_time.forEach((time) => {
									if (!acc[time]) {
										acc[time] = { name: time, complete: false };
									}
								});
							}
						});
					}
				});
				return acc;
			}, {});

			return {
				date: dateString,
				hasWorkTime: dailyWorkTimes,
			};
		});

		setWeekWork(weekDates);
	}, [timer, data]);

	useEffect(() => {
		if (!weekWork) {
			setLastTime([]);
			return;
		}

		// 假设你的目的是要筛选出所有标记为完成的工作时间
		const completedTimes = weekWork.map((day) => ({
			...day,
			hasWorkTime: Object.entries(day.hasWorkTime)
				.filter(([_, time]) => time.complete)
				.reduce((acc, [name, time]) => {
					acc[name] = time;
					return acc;
				}, {}),
		}));

		console.log(completedTimes); // 或者根据你的需要更新状态
		setLastTime(completedTimes);
	}, [weekWork]);

	return (
		<WeekWorkContext.Provider value={{ weekWork, setWeekWork, lastTime }}>
			{children}
		</WeekWorkContext.Provider>
	);
};
