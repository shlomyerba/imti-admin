export function getHourAndMinuteFormat(date){
    let min = date.getMinutes();
      if (date.getMinutes() < 10) {
        min = `0${date.getMinutes()}`;
      }
      let hour = date.getHours();
      if (date.getHours() < 10) {
        hour = `0${date.getHours()}`;
      }
    return `${hour}:${min}`;
} 