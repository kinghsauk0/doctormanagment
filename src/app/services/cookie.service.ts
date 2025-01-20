import Cookies from 'js-cookie';

export const setCookie = (key: string, value: string) => {
  Cookies.set(key, value, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
    secure: true,
  });
};

export const getCookie = (key: string) => {
  return Cookies.get(key);
};

export const removeCookie = (key: string) => {
  Cookies.remove(key);
};
