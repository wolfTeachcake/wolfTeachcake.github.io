import CheckFieldContainer from './component/check-container/check-container.component';
import TimerContainer from './component/timer-container/timer-container.component';
import ScheduleContainer from './component/schedule-container/schedule-container.component';
import CompleteTime from './component/complete-time/complete-time.component';

function App() {
	return (
		<div className="App">
			<h1>預約領航時間確認</h1>
			<CheckFieldContainer />
			<TimerContainer />
			<ScheduleContainer />
			<CompleteTime />
		</div>
	);
}

export default App;
