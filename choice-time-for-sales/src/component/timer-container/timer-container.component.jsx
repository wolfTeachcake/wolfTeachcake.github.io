import { useContext } from 'react';
import { TimerContext } from '../../context/timer.context';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

import { FlexContainer, TitleName } from './timer-container.styled';

const TimerContainer = () => {
	const { timer, setTimer } = useContext(TimerContext);
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
			/>
		</FlexContainer>
	);
};

export default TimerContainer;
