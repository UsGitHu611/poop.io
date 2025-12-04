export const formattingDate = timestamp => {
	return new Date(timestamp).toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: 'numeric',
		year: '2-digit',
	});
};
