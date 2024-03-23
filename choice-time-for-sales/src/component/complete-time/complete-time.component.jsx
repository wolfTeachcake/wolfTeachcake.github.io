import React, { useContext } from 'react';
import { WeekWorkContext } from '../../context/week-work.context';
import { FlexContainer, TitleName } from './complete-time.styled';
import dayjs from 'dayjs';

const CompleteTime = () => {
	const { lastTime } = useContext(WeekWorkContext);
	const weekNum = ['日', '一', '二', '三', '四', '五', '六'];
	const trueTimes = [
		{ name: 'A', time: '13:00-15:00' },
		{ name: 'B', time: '17:00-19:00' },
		{ name: 'C', time: '19:00-21:00' },
	];

	// 只处理包含至少一个已完成工作时间的日期
	const completedDays =
		lastTime?.filter(
			(day) => day.hasWorkTime && Object.values(day.hasWorkTime).some((time) => time.complete)
		) || [];

	if (completedDays.length === 0) {
		return <FlexContainer>請輸入足夠的資訊</FlexContainer>;
	}

	return (
		<div>
			{completedDays.map((day, dayIndex) => (
				<FlexContainer key={dayIndex}>
					<strong>{`${day.date}（${weekNum[`${dayjs(day.date).day()}`]}）`}</strong>
					{Object.entries(day.hasWorkTime)
						.filter(([_, timeDetail]) => timeDetail.complete)
						.map(([name, _], timeIndex) => {
							const trueTime = trueTimes.find((tt) => tt.name === name);
							return trueTime ? (
								<div key={timeIndex}>
									<span>{trueTime.time}</span>
								</div>
							) : null;
						})}
				</FlexContainer>
			))}
		</div>
	);
};

export default CompleteTime;
