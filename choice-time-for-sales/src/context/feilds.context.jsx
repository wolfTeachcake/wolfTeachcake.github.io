import { createContext, useState, useEffect } from 'react';

const defaultCheckFields = [
	{
		id: 'GD',
		name: '平面設計',
		complete: false,
	},
	{
		id: 'PR',
		name: '影音自媒體',
		complete: false,
	},
	{
		id: 'IL',
		name: '商業插畫',
		complete: false,
	},
	{
		id: '2D',
		name: '2D動畫',
		complete: false,
	},
	{
		id: '3D',
		name: '3D動畫',
		complete: false,
	},
	{
		id: 'UIUX',
		name: 'UIUX',
		complete: false,
	},
	{
		id: 'MKT',
		name: '數位行銷',
		complete: false,
	},
	{
		id: 'SD',
		name: '軟體開發',
		complete: false,
	},
	{
		id: 'AI',
		name: '人工智慧實務',
		complete: false,
	},
	{
		id: 'FED',
		name: '前端設計',
		complete: false,
	},
	{
		id: 'FE2',
		name: '前端工程',
		complete: false,
	},
	{
		id: 'BE',
		name: '後端工程',
		complete: false,
	},
	{
		id: 'AT',
		name: '自動化交易',
		complete: false,
	},
];

const changeCompoleteHandler = (id, fields) => {
	const change = fields.map((field, key) => {
		if (field.id === id) return { ...field, complete: !field.complete };
		return { ...field };
	});
	return change;
};

export const FieldsContext = createContext({
	fields: {},
	changeHandler: () => {},
	setFields: () => {},
	currentFields: {},
});

export const FieldsProvider = ({ children }) => {
	const [fields, setFields] = useState(defaultCheckFields);
	const [currentFields, setCurrentFields] = useState(null);
	const changeHandler = (id) => {
		setFields(changeCompoleteHandler(id, fields));
	};
	useEffect(() => {
		const currentFieldsMap = fields.filter((field) => field.complete === true);
		setCurrentFields(currentFieldsMap);
	}, [fields]);

	const value = { fields, setFields, changeHandler, currentFields };

	return <FieldsContext.Provider value={value}>{children}</FieldsContext.Provider>;
};
