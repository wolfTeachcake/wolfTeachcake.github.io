import React from 'react';
import ReactDOM from 'react-dom/client';
import { FieldsProvider } from './context/feilds.context';
import { TimerProvider } from './context/timer.context';
import { WeekWorkProvider } from './context/week-work.context';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<FieldsProvider>
			<TimerProvider>
				<WeekWorkProvider>
					<App />
				</WeekWorkProvider>
			</TimerProvider>
		</FieldsProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
