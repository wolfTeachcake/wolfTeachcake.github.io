import React, { createContext, useEffect, useState } from 'react';

export const DataContext = createContext({
	data: null,
	setData: () => {},
});

export const DataProvider = ({ children }) => {
	const [data, setData] = useState(null);
	useEffect(() => {
		fetch(
			'https://raw.githubusercontent.com/wolfTeachcake/wolfTeachcake.github.io/main/updated_persons.json'
		)
			.then((response) => response.json())
			.then((data) => setData(data))
			.catch((error) => console.error('Error fetching data:', error));
	}, []);

	const value = { data, setData };
	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
