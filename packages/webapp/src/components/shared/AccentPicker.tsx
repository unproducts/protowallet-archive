import React, { useState } from 'react';
import { accentOptions } from '../../constants/accents';

const AccentPicker = () => {
	const [selectedColor, setSelectedColor] = useState(null);
	const handleColorSelection = (selectedOption) => {
		setSelectedColor(selectedOption.value);
	};

	return (
		<div>
			{accentOptions.map((colorOption) => (
				<div
					key={colorOption.value}
					onClick={() => handleColorSelection(colorOption)}
					style={{
						display: 'inline-block',
						margin: '8px',
						cursor: 'pointer',
						border: `2px solid ${colorOption.value === selectedColor ? 'black' : 'transparent'}`,
						borderRadius: '50%',
						width: '24px',
						height: '24px',
						backgroundColor: colorOption.value,
					}}
				/>
			))}
		</div>
	);
};

export default AccentPicker;
