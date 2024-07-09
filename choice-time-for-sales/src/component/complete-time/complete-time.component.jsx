import React, { useContext, useRef, Fragment } from 'react';
import { WeekWorkContext } from '../../context/week-work.context';
import { FlexContainer } from './complete-time.styled';
import { Button } from 'antd';
import dayjs from 'dayjs';

const CompleteTime = () => {
	const { lastTime } = useContext(WeekWorkContext);
	const weekNum = ['日', '一', '二', '三', '四', '五', '六'];
	const trueTimes = [
		{ name: 'A', time: '13:00-15:00' },
		{ name: 'B', time: '15:00-17:00' },
		{ name: 'C', time: '17:00-19:00' },
		{ name: 'D', time: '19:00-21:00' },
	];

	const resultRef = useRef(null);

	// 只处理包含至少一个已完成工作时间的日期
	const completedDays =
		lastTime?.filter(
			(day) => day.hasWorkTime && Object.values(day.hasWorkTime).some((time) => time.complete)
		) || [];

	// 按日期排序
	completedDays.sort((a, b) => new Date(a.date) - new Date(b.date));

	if (completedDays.length === 0) {
		return <FlexContainer>請輸入足夠的時間</FlexContainer>;
	}

	const handleCopy = () => {
		const resultText = resultRef.current.innerText;
		navigator.clipboard
			.writeText(resultText)
			.then(() => {
				alert('已複製到剪貼簿');
			})
			.catch((err) => {
				console.error('複製失敗', err);
			});
	};
	const handleReload = () => {
		window.location.reload();
	};

	return (
		<div>
			<div
				id="result"
				ref={resultRef}
			>
				{completedDays.map((day, dayIndex) => (
					<FlexContainer key={dayIndex}>
						{`${day.date}（${weekNum[`${dayjs(day.date).day()}`]}）`}
						{trueTimes.map((trueTime, timeIndex) => {
							const hasWorkTime = day.hasWorkTime[trueTime.name];
							if (hasWorkTime && hasWorkTime.complete) {
								const isLast =
									trueTimes
										.filter((tt) => day.hasWorkTime[tt.name]?.complete)
										.pop().name === trueTime.name;
								return (
									<Fragment key={timeIndex}>
										{`${trueTime.time}${isLast ? '' : '、'}`}
									</Fragment>
								);
							}
							return null;
						})}
					</FlexContainer>
				))}
			</div>
			<FlexContainer>
				<Button onClick={handleCopy}>複製結果</Button>
				<Button onClick={handleReload}>重新載入</Button>
			</FlexContainer>
		</div>
	);
};

export default CompleteTime;
