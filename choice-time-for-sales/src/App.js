import { useEffect, useState, useContext } from 'react';
import TimerContainer from './component/timer-container/timer-container.component';
import ScheduleContainer from './component/schedule-container/schedule-container.component';
import CompleteTime from './component/complete-time/complete-time.component';

import { DataContext } from './context/fetchData.context';
import styled from 'styled-components';
import { Button } from 'antd';

const AlertTable = styled.div`
	top: 0;
	left: 0;
	position: fixed;
	z-index: 999;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.2);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 20px;
`;
const ContainerStyle = styled.div`
	width: 90vw;
	margin: 0 auto;
`;

function App() {
	const [shouldRefresh, setShouldRefresh] = useState(false);
	const [startTime, setStartTime] = useState(Date.now());
	const { data, reload } = useContext(DataContext);

	useEffect(() => {
		const checkTime = () => {
			const currentTime = new Date();
			const elapsedMinutes = (Date.now() - startTime) / 60000; // 計算已過時間(分鐘)

			// 判斷是否過了晚上12點
			const isMidnight = currentTime.getHours() === 0 && currentTime.getMinutes() === 0;

			// 判斷是否已經超過 15 分鐘
			const isOver15Minutes = elapsedMinutes >= 15;

			if (isMidnight || isOver15Minutes) {
				setShouldRefresh(true);
			}
		};

		// 每分鐘檢查一次
		const interval = setInterval(checkTime, 60000);

		return () => clearInterval(interval);
	}, [startTime]);

	// 手動觸發刷新
	const handleRefresh = () => {
		window.location.reload();
	};
	// **按下送出後，重新計算 15 分鐘**
	const handleReload = async () => {
		await reload(); // 重新抓取 API 資料
		setStartTime(Date.now()); // 重置開始時間，讓 15 分鐘計時重新開始
		setShouldRefresh(false); // 隱藏警告框（如果已經觸發）
	};

	return (
		<ContainerStyle>
			<p>目前頁面開啟時間：{new Date(startTime).toLocaleTimeString()}</p>
			{shouldRefresh && (
				<AlertTable>
					<p>系統偵測到需要重新整理頁面！</p>
					<Button
						onClick={handleRefresh}
						size="large"
					>
						點擊重新整理
					</Button>
				</AlertTable>
			)}
			<h1>導覽確認</h1>
			<h3>請至少選出三個可以時段</h3>
			<div
				style={{
					display: 'flex',
					width: '90%',
					gap: '20px',
					margin: '0 auto',
					marginBottom: '30px',
				}}
			>
				<TimerContainer />
				<button onClick={handleReload}>送出</button>
			</div>
			<ScheduleContainer />
			<CompleteTime />
		</ContainerStyle>
	);
}

export default App;
