import { toRefs, reactive } from "vue";

const layoutConfig = reactive({
  ripple: false,
  darkTheme: false,
  inputStyle: "outlined",
  menuMode: "static",
  theme: "lara-light-indigo",
  activeMenuItem: null
});

const layoutState = reactive({});

export function useLayout() {
  const changeThemeSettings = (theme, darkTheme) => {
    layoutConfig.darkTheme = darkTheme;
    layoutConfig.theme = theme;
  };

  return {
    layoutConfig: toRefs(layoutConfig),
    layoutState: toRefs(layoutState),
    changeThemeSettings
  };
}
