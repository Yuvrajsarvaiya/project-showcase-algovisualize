import { useEffect, useState } from "react";

import { THEME } from "../../constants";

function ThemeToggle() {
  const [theme, setTheme] = useState(THEME.RED_THEME);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const onChangedTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div className="color-palate">
      <button
        style={
          theme === THEME.RED_THEME
            ? {
                outline: "3px solid var(--primary-outline)",
              }
            : {
                transform: "scale(0.8)",
              }
        }
        className="color-square color-red"
        onClick={() => onChangedTheme(THEME.RED_THEME)}
      ></button>
      <button
        style={
          theme === THEME.ORANGE_THEME
            ? { outline: "3px solid var(--primary-outline)" }
            : {
                transform: "scale(0.8)",
              }
        }
        className="color-square color-orange"
        onClick={() => onChangedTheme(THEME.ORANGE_THEME)}
      ></button>
    </div>
  );
}

export default ThemeToggle;
