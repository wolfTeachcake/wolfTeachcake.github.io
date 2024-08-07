import Schedule from '../schedule/schedule.component';
import { FlexContainer, TitleName } from './schedule-container.styled';
const ScheduleContainer = () => {
	return (
		<FlexContainer>
			<TitleName>可安排時間：</TitleName>
			<Schedule />
		</FlexContainer>
	);
};

export default ScheduleContainer;
