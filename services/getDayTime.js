const getDayTime = () => {
  const getDateTimeString = (date) => {
    const dateStr = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    const timeStr = getShortTime(date);
    return timeStr + " " + dateStr;
  };

  const getDateString = (date) => {
    const dayStr = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    // console.log(date, dayStr);
    return dayStr;
  };

  const getWeekDay = (date) => {
    let day = date.getDay();
    switch (day) {
      case 0:
        day = "Sunday";
        break;
      case 1:
        day = "Monday";
        break;
      case 2:
        day = "Tuesday";
        break;
      case 3:
        day = "Wednesday";
        break;
      case 4:
        day = "Thusday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = "Saturday";
        break;
      default:
        console.log("Not a weekday");
    }
    return day;
  };

  const getTime = (date) => {
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    let zeroMinute = "";
    let zeroSecond = "";
    if (minute < 10) zeroMinute = "0";
    if (second < 10) zeroSecond = "0";
    const time = `${hour}:${zeroMinute}${minute}:${zeroSecond}${second}`;
    return time;
  };

  const getShortTime = (date) => {
    const hour = date.getHours();
    const minute = date.getMinutes();
    let zeroMinute = "";
    if (minute < 10) zeroMinute = "0";
    const shortTime = `${hour}:${zeroMinute}${minute}`;
    return shortTime;
  };

  // const getTimeFromTimestamp = timestamp => {
  //     const date = new Date(timestamp*1000);
  //     const hour = date.getHours();
  //     const minute = date.getMinutes();
  //     let zeroMinute = '';
  //     if(minute < 10) zeroMinute = '0';
  //     const time = `${hour}:${zeroMinute}${minute}`;
  //     return time;
  // }

  // const getHourFromTimestamp = timestamp => {
  //     const date = new Date(timestamp*1000);
  //     const hour = date.getHours();
  //     return hour;
  // }

  const getTimeFromTimestamp = (timestamp, timezoneOffset) => {
    const date = new Date(timestamp * 1000);
    const prehour = date.getHours() - 7 + timezoneOffset / 3600;
    const hour = prehour > 23 ? prehour - 24 : prehour;
    const minute = date.getMinutes();
    let zeroMinute = "";
    if (minute < 10) zeroMinute = "0";
    const time = `${hour}:${zeroMinute}${minute}`;
    return time;
  };

  const getHourFromTimestamp = (timestamp, timezoneOffset) => {
    const date = new Date(timestamp * 1000);
    const prehour = date.getHours() - 7 + timezoneOffset / 3600;
    const hour = prehour > 23 ? prehour - 24 : prehour;
    return hour;
  };

  return {
    getWeekDay,
    getDateString,
    getDateTimeString,
    getTime,
    getShortTime,
    getTimeFromTimestamp,
    getHourFromTimestamp,
  };
};

export default getDayTime;
