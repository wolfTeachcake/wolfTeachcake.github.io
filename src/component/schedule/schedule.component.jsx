import { useContext } from 'react';
import { WorkingContext } from '../../context/working.context';
import { Checkbox } from 'antd';
import { TitleName } from './schedule.styled';
import dayjs from 'dayjs';

const Schedule = () => {
	const { weekWork, handlerWorking } = useContext(WorkingContext);
	const trueTimes = [
		{ time: 1300, name: `13:00-15:00` },
		{ time: 1500, name: `15:00-17:00` },
		{ time: 1700, name: `17:00-19:00` },
		{ time: 1900, name: `19:00-21:00` },
	];
	const week = ['日', '一', '二', '三', '四', '五', '六'];
	const DateWeek = () => {
		return weekWork.map((ele, key) => (
			<div
				key={key}
				style={{ display: 'flex', gap: '10px' }}
			>
				<TitleName>{`${dayjs(ele.date).format('YYYY-MM-DD')} (${
					week[dayjs(ele.date).day()]
				})`}</TitleName>

				{trueTimes.map((trueTime) => {
					const findTarget = ele.onwork.find((e) => e.time === trueTime.time);
					if (findTarget.working)
						return (
							<Checkbox
								key={trueTime.name}
								name={trueTime.name}
								value={trueTime.name}
								checked={findTarget.isCompleted}
								onChange={() => handlerWorking(ele.date, findTarget.time)}
							>
								<TitleName>{trueTime.name}</TitleName>
							</Checkbox>
						);
					return null;
				})}
			</div>
		));
	};

	return <span>{weekWork && <DateWeek />}</span>;
};

export default Schedule;
