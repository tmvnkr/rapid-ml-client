import { themeHandler, themeKey } from '../theme';

export const themeDefaults = {
  theme: localStorage.getItem(themeKey)
};

export const themeResolvers = {
  Mutation: {
    toggleTheme: (_parent, _args, { cache }) => {
      if (localStorage.getItem(themeKey) === 'false') {
        themeHandler('true');
        cache.writeData({ data: { theme: 'true' } });
      } else {
        themeHandler('false');
        cache.writeData({ data: { theme: 'false' } });
      }
      return null;
    }
  }
};
