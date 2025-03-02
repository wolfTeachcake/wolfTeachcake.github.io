import { useContext } from 'react';
import { TimerContext } from '../../context/timer.context';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

import { FlexContainer, TitleName } from './timer-container.styled';

const TimerContainer = () => {
	const { timer, setTimer } = useContext(TimerContext);
	// 限制只能選擇明天之後的日期
	const disabledDate = (current) => {
		return current && current < dayjs().endOf('day'); // 禁用今天及過去的日期
	};
	const onChange = (value) => {
		if (!value) return setTimer(null);
		setTimer(dayjs(value));
	};
	return (
		<FlexContainer>
			<TitleName>合約生效日：</TitleName>
			<DatePicker
				defaultValue={timer ? timer : ''}
				onChange={onChange}
				disabledDate={disabledDate} // 加入日期禁用條件
			/>
		</FlexContainer>
	);
};

export default TimerContainer;
