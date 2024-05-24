import { DateTime } from "luxon";

export default function dateTimeFormat(date: string) {
	return DateTime.fromSQL(date, { zone: "utc" })
		.setZone("America/Los_Angeles")
		.toFormat("yyyy/MM/dd HH:mm:ss");
}
