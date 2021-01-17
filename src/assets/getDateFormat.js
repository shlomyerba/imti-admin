export function getDateFormat(date) {
  let day = date.getDate();
  if (date.getDate() < 10) {
    day = `0${date.getDate()}`;
  }
  let month = date.getMonth() + 1;
  if (date.getMonth() + 1 < 10) {
    month = `0${date.getMonth() + 1}`;
  }
  return `${date.getFullYear()}-${month}-${day}`;
}

export function getHourAndMinuteFormat(date) {
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


export function getDateFormatForNews(date) {
  let day = date.getDate();
  if (date.getDate() < 10) {
    day = `0${date.getDate()}`;
  }
  let month = date.getMonth() + 1;
  if (date.getMonth() + 1 < 10) {
    month = `0${date.getMonth() + 1}`;
  }
  return `${day}-${month}-${date.getFullYear()}`;
}