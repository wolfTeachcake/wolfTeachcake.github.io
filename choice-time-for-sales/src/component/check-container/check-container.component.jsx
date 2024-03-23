import { useContext } from 'react';
import { FieldsContext } from '../../context/feilds.context';
import { Flex } from 'antd';
import CheckFields from '../check-fields/check-fields.component';
import { FlexContainer, TitleName } from './check-container.styled';

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

const CheckFieldContainer = () => {
	const { fields, setFields } = useContext(FieldsContext);
	const resetCheckFields = () => {
		setFields(defaultCheckFields);
	};

	return (
		<FlexContainer>
			<TitleName>學員購買領域：</TitleName>
			<Flex wrap="wrap">
				{fields.map((feild, key) => (
					<CheckFields
						feild={feild}
						key={key}
					/>
				))}
			</Flex>
		</FlexContainer>
	);
};

export default CheckFieldContainer;
