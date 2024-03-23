import { Checkbox } from 'antd';
import { useContext } from 'react';
import { FieldsContext } from '../../context/feilds.context';
import { TitleName } from './check-fields.styled';

const CheckFields = ({ feild }) => {
	const { changeHandler } = useContext(FieldsContext);
	const changeHandle = (event) => {
		const { name } = event.target;
		changeHandler(name);
	};
	return (
		<span>
			<Checkbox
				name={feild.id}
				value={feild.complete}
				onChange={changeHandle}
				checked={feild.complete}
			>
				<TitleName>{feild.name}</TitleName>
			</Checkbox>
		</span>
	);
};

export default CheckFields;
