import { createContext, useContext } from "react";

// to create the context
export const ThemeContext = createContext({
  themeMode: "light",
  darkTheme: () => {},
  lightTheme: () => {},
});

// to use the context  that we created
export const ThemeProvider = ThemeContext.Provider;

//to use the context in the component
export default function useTheme() {
  return useContext(ThemeContext);
}
