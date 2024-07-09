import { useContext, useCallback } from 'react';
import { TimerContext } from '../../context/timer.context';
import { WeekWorkContext } from '../../context/week-work.context';

import { Checkbox } from 'antd';
import { TitleName } from './schedule.styled';

const Schedule = () => {
	const { weekWork, setWeekWork } = useContext(WeekWorkContext);
	const { timer } = useContext(TimerContext);

	const changeCompleteHandler = useCallback(
		(date, name) => {
			const updatedWeekWork = weekWork.map((day) => {
				if (day.date === date) {
					const hasWorkTime = {
						...day.hasWorkTime,
						[name]: {
							...day.hasWorkTime[name],
							complete: !day.hasWorkTime[name].complete,
						},
					};
					return { ...day, hasWorkTime };
				}
				return day;
			});
			setWeekWork(updatedWeekWork);
		},
		[weekWork, setWeekWork]
	);

	const DateWeek = () => {
		const weekNum = ['日', '一', '二', '三', '四', '五', '六'];
		const trueTimes = [
			{ name: 'A', time: '13:00-15:00' },
			{ name: 'B', time: '15:00-17:00' },
			{ name: 'C', time: '17:00-19:00' },
			{ name: 'D', time: '19:00-21:00' },
		];
		return weekWork.map((day, key) => (
			<div key={key}>
				<TitleName>{`${day.date}（${
					weekNum[`${timer.add(key, 'day').day()}`]
				}）`}</TitleName>
				{trueTimes.map((trueTime) => {
					if (day.hasWorkTime.hasOwnProperty(trueTime.name)) {
						return (
							<Checkbox
								key={trueTime.name}
								name={trueTime.name}
								value={trueTime.name}
								checked={day.hasWorkTime[trueTime.name].complete}
								onChange={() => changeCompleteHandler(day.date, trueTime.name)}
							>
								<TitleName>{trueTime.time}</TitleName>
							</Checkbox>
						);
					}
					return null;
				})}
			</div>
		));
	};

	return <span>{weekWork && timer && <DateWeek />}</span>;
};

export default Schedule;
