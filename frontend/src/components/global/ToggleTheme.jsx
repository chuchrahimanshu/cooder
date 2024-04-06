// The "ToggleTheme" component is a switch to change theme mode.

// Import Section
import { useDispatch, useSelector } from "react-redux";
import {
  SET_DARK_THEME,
  SET_LIGHT_THEME,
} from "../../redux/global/global.slice";

// JSX Component Function
const ToggleTheme = () => {
  // Hooks Configuration
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.global);

  // Form Handling Section
  const handleThemeToggle = async () => {
    if (theme === "light") {
      await dispatch(SET_DARK_THEME());
    } else {
      await dispatch(SET_LIGHT_THEME());
    }
  };

  // Returning JSX
  return (
    <section
      className="toggle-theme"
      onClick={handleThemeToggle}
      title={theme === "light" ? "Sunset" : "Sunrise"}>
      {theme === "light" ? "🌚" : "🌞"}
    </section>
  );
};

// Export Section
export { ToggleTheme };
