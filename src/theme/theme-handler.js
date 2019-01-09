import { darkTheme, lightTheme } from './';

export const themeKey = 'dark-theme';

const themeHandler = setDarkTheme => {
  if (setDarkTheme === 'true') {
    localStorage.setItem(themeKey, true);
    return darkTheme;
  } else {
    localStorage.setItem(themeKey, false);
    return lightTheme;
  }
};

export default themeHandler;
