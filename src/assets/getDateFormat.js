export function getDateFormat(date){
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