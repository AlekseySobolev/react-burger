import { format, formatDistanceToNowStrict, isToday, isYesterday } from "date-fns";
import ru from "date-fns/locale/ru";
import { orderColors, orderLocaleStatus } from "./constants";

export const getOrderLocaleStatus = (status) => {

  return orderLocaleStatus[status];
}

export const getOrderNumberColor = (status) => {

  return orderColors[status];
}

export const normalizeOrderDate = (date) => {

  const createdAtDate = new Date(date);

  const day = isToday(createdAtDate) 
  ? `Сегодня`
  :isYesterday(createdAtDate)
  ? 'Вчера'
  :  formatDistanceToNowStrict(createdAtDate, {
    unit: 'day',
    addSuffix: true,
    locale: ru
  });

   const hours = format(createdAtDate, 'p', {locale: ru});
   
   return `${day}, ${hours} i-GMT+3`;
}


export const checkResponse = (response) => {
    if (response.ok) {
      return response.json()
    }
  }
  
  export function getCookie(name) {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  
  export function setCookie(name, value, props) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
      const d = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
      props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
      updatedCookie += '; ' + propName;
      const propValue = props[propName];
      if (propValue !== true) {
        updatedCookie += '=' + propValue;
      }
    }
    document.cookie = updatedCookie;
  }
  
  export function deleteCookie(name) {
    setCookie(name, null, { expires: -1 });
  }