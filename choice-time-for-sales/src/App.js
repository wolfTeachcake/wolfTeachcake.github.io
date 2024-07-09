import TimerContainer from './component/timer-container/timer-container.component';
import ScheduleContainer from './component/schedule-container/schedule-container.component';
import CompleteTime from './component/complete-time/complete-time.component';

function App() {
	return (
		<div className="App">
			<h1>首通確認</h1>
			<h3>請至少選出三個可以時段</h3>
			<TimerContainer />
			<ScheduleContainer />
			<CompleteTime />
		</div>
	);
}

export default App;
