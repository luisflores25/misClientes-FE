export default function textFormat(string: string) {
	let text = string.replaceAll("_", " ");
	return text.replace(/\b(?!by|at)\w+\b/g, function (match) {
		return match.length <= 3
			? match.toUpperCase()
			: match.charAt(0).toUpperCase() + match.slice(1);
	});
}
