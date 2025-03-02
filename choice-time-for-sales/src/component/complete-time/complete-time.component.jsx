import React, { useContext, useRef, Fragment } from 'react';
import { WorkingContext } from '../../context/working.context';
import { FlexContainer } from './complete-time.styled';
import { Button } from 'antd';
import dayjs from 'dayjs';

const CompleteTime = () => {
	const { weekWork } = useContext(WorkingContext);
	const weekNum = ['日', '一', '二', '三', '四', '五', '六'];
	const trueTimes = [
		{ time: 1300, name: `13:00-15:00` },
		{ time: 1500, name: `15:00-17:00` },
		{ time: 1700, name: `17:00-19:00` },
		{ time: 1900, name: `19:00-21:00` },
	];
	const resultRef = useRef(null);

	if (!weekWork) return null;
	const completedDays =
		weekWork.filter(
			(day) => day.onwork && Object.values(day.onwork).some((time) => time.isCompleted)
		) || [];
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
						{`${day.date}（${weekNum[dayjs(day.date).day()]}）`}
						{trueTimes
							.map((trueTime) => {
								const tagetTime = day.onwork.find(
									(time) => time.time === trueTime.time
								);
								return tagetTime.isCompleted ? trueTime.name : '';
							})
							.filter((e) => e)
							.join('、')}
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
