import React, {useState, FunctionComponent} from "react";
import dayjs from "dayjs";
import dayjsutc from "dayjs/plugin/utc";
import dayjstimezone from "dayjs/plugin/timezone";
const config = require(`/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);
import {useLocale, useTranslations} from 'next-intl';
import {useUserContext} from "../../components/UserContext";

export interface RaceRowTR {
	collapsed: Boolean;
	hasOccured: boolean;
	hasMultipleFeaturedEvents: boolean;
	isNextRace: boolean;
	title: string;
	date: string;
	isFeaturedSession: boolean;
	event: string;
	eventLocaleKey: string;
}

const RaceTR: FunctionComponent<RaceRowTR> = ({ hasMultipleFeaturedEvents, title, collapsed, hasOccured, isFeaturedSession, date, isNextRace, event, eventLocaleKey }: Props) => {

	const t = useTranslations('All');
	const locale = useLocale();

	if (locale != "en") {
		dayjs.locale(locale);
	}
	
	const titleKey = "schedule." + title;
	
	var eventName = event;
	if(t(eventLocaleKey)){
		eventName = t(eventLocaleKey);
	}
	
	let {timezone, timeFormat} = useUserContext();
	
	if (hasMultipleFeaturedEvents) {
		var blankColumnCount = config.featuredSessions.length - 1;

		return (
			<tr className={`${collapsed ? "hidden" : ""} ${hasOccured ? "line-through text-gray-400" : ""}`}>
				<td className=""></td>
				<td className="p-4">{t(titleKey)}</td>
				<td className="text-right">
					<div className="pr-2 md:pr-4">
						{dayjs(date)
							.tz(timezone)
							.format(
								timeFormat == 12
									? "D MMM h:mm A"
									: "D MMM HH:mm"
							)}
					</div>
				</td>
			</tr>
		);
	} else {
		return (
			<tr className={`${collapsed ? "hidden" : ""} ${hasOccured ? "line-through text-gray-400" : ""} ${!hasOccured && isFeaturedSession ? "font-bold" : ""} ${isNextRace && isFeaturedSession ? "text-yellow-600" : ""}`}>
				<td className=""></td>
				<td className="p-4"><span className="hidden">{eventName}</span> {t(titleKey)}</td>
				<td className="text-right md:text-left">
					{dayjs(date)
						.tz(timezone)
						.format("D MMM")}
				</td>
				<td className="">
					<div className={`text-right md:text-left pr-2 md:pr-0`}>
						{dayjs(date)
							.tz(timezone)
							.format(timeFormat == 12 ? "h:mm A" : "HH:mm")}
					</div>
				</td>
			</tr>
		);
	}
}

export default RaceTR;
