function format(time, unit) {
  let hours;
  let minutes;
  let seconds;
  let milliseconds;

  function(unit) {
    if(unit == "hours") {
      return 
    }
  }

  if(unit == "milliseconds") {
    if(time > 1000) {
      hours = Math.trunc(time / 3600);
      minutes = Math.trunc((time % 3600) / 60);
      seconds = Math.trunc(time % 60);
      milliseconds = time % 1000;
    }
  }
}



function formatTime(time, {hoursConfig, minutesConfig, secondsConfig}) {
  let hours;
  let minutes;
  let seconds;

  let timeFormatted;

  if(hoursConfig == "enabled" || hoursConfig == "auto") {
    hours = Math.trunc(time / 3600);
    time -= hours * 3600;

    if(hoursConfig == "enabled") {
      hours = hours.toString().padStart(2, "0");
    }

    if(hoursConfig == "auto") {
      hours = (hours > 0) ? hours.toString().padStart(2, "0") : "";
    }

    timeFormatted = hours;
  }

  if(minutesConfig == "enabled" || minutesConfig == "auto") {
    minutes = Math.trunc(time / 60);
    time -= minutes * 60;

    if(minutesConfig == "enabled") {
      minutes = minutes.toString().padStart(2, "0");
    }

    if(minutesConfig == "auto") {
      minutes = (minutes > 0) ? minutes.toString().padStart(2, "0") : "";
    }

    timeFormatted = timeFormatted ? timeFormatted + ":" + minutes : minutes;
  }

  if(secondsConfig == "enabled" || secondsConfig == "auto") {
    seconds = time;

    if(secondsConfig == "enabled") {
      seconds = seconds.toString().padStart(2, "0");
    }

    if(secondsConfig == "auto") {
      seconds = (seconds > 0) ? seconds.toString().padStart(2, "0") : "";
    }

    timeFormatted = timeFormatted ? timeFormatted + ":" + seconds : seconds;
  }

  console.log(timeFormatted);
}

formatTime(2000, {hoursConfig: "enabled", minutesConfig: "enabled", secondsConfig: "enabled"});



















import { createSignal, createEffect } from "solid-js";

type UnitState = "disabled" | "enabled" | "auto";

interface TimeOptions {
  log?: boolean;
  units?: {
    milliseconds?: UnitState;
    seconds?: UnitState;
    minutes?: UnitState;
    hours?: UnitState;
  };
}

type TimeReturn = [
  () => number,
  {
    addTime: (value: number, unit: "milliseconds" | "seconds" | "minutes" | "hours") => void;
    subtractTime: (value: number, unit: "milliseconds" | "seconds" | "minutes" | "hours") => void;
    formatTime: () => string;
  }
];

function useTime(initialTime: number = 0, { log = false, units = { milliseconds: "enabled", seconds: "enabled", minutes: "enabled", hours: "enabled" } }: TimeOptions = {}): TimeReturn {
  const [time, setTime] = createSignal<number>(initialTime);

  const convertTime = (value: number, from: "milliseconds" | "seconds" | "minutes" | "hours", to: "milliseconds" | "seconds" | "minutes" | "hours"): number => {
    const conversionFactors = {
      milliseconds: 1,
      seconds: 1000,
      minutes: 1000 * 60,
      hours: 1000 * 60 * 60
    };
    return (value * conversionFactors[from]) / conversionFactors[to];
  };

  const addTime = (value: number, unit: "milliseconds" | "seconds" | "minutes" | "hours") => {
    const currentTime = time();
    const newTime = currentTime + convertTime(value, unit, "milliseconds");
    setTime(newTime);
    if (log) console.log(`[INFO] Time Added\nUnit: ${unit}\nValue: ${value}\nNew Time: ${newTime}`);
  };

  const subtractTime = (value: number, unit: "milliseconds" | "seconds" | "minutes" | "hours") => {
    const currentTime = time();
    const newTime = currentTime - convertTime(value, unit, "milliseconds");
    setTime(newTime);
    if (log) console.log(`[INFO] Time Subtracted\nUnit: ${unit}\nValue: ${value}\nNew Time: ${newTime}`);
  };

  const shouldDisplayUnit = (unit: "milliseconds" | "seconds" | "minutes" | "hours"): boolean => {
    switch (units[unit]) {
      case "enabled":
        return true;
      case "auto":
        switch (unit) {
          case "milliseconds":
            return time() % 1000 !== 0;
          case "seconds":
            return time() >= 1000 && time() % (1000 * 60) !== 0;
          case "minutes":
            return time() >= 1000 * 60 && time() % (1000 * 60 * 60) !== 0;
          case "hours":
            return time() >= 1000 * 60 * 60;
          default:
            return false;
        }
      default:
        return false;
    }
  };

  const formatTime = (): string => {
    const currentTime = time();
    const hours = Math.floor(convertTime(currentTime, "milliseconds", "hours"));
    const minutes = Math.floor(convertTime(currentTime, "milliseconds", "minutes") % 60);
    const seconds = Math.floor(convertTime(currentTime, "milliseconds", "seconds") % 60);
    const milliseconds = currentTime % 1000;

    const formattedTime = [
      shouldDisplayUnit("hours") ? String(hours).padStart(2, '0') : '00',
      shouldDisplayUnit("minutes") ? String(minutes).padStart(2, '0') : '00',
      shouldDisplayUnit("seconds") ? String(seconds).padStart(2, '0') : '00',
      shouldDisplayUnit("milliseconds") ? String(milliseconds).padStart(3, '0') : '000'
    ].join(':');

    if (log) console.log(`[INFO] Time Formatted\nFormatted Time: ${formattedTime}`);

    return formattedTime;
  };

  createEffect(() => {
    if (log) console.log(`[INFO] Time Initialized\nInitial Time: ${initialTime}`);
  });

  return [
    time,
    {
      addTime,
      subtractTime,
      formatTime
    }
  ];
}

export default useTime;
