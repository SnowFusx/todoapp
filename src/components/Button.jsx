export const Button = ({ text, svg, onClick, styles }) => {
	return (
		<button className={styles} onClick={onClick}>
			{svg}
			{text}
		</button>
	);
};
