import TimerContainer from './component/timer-container/timer-container.component';
import ScheduleContainer from './component/schedule-container/schedule-container.component';
import CompleteTime from './component/complete-time/complete-time.component';
import styled from 'styled-components';
const ContainerStyle = styled.div`
	width: 90vw;
	margin: 0 auto;
`;
function App() {
	return (
		<ContainerStyle className="App">
			<h1>導覽確認</h1>
			<h3>請至少選出三個可以時段</h3>
			<TimerContainer />
			<ScheduleContainer />
			<CompleteTime />
		</ContainerStyle>
	);
}

export default App;
