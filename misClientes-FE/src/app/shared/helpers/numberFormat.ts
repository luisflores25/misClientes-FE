export default function numberFormat(number: number | string) {
	return number.toString().replace(/\B(?=(\d{3})+\b)/g, ",");
}
