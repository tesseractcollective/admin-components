export declare type ThemeName = 'light' | 'dark';
declare function useTheme(): {
    themeName: ThemeName;
    isDarkMode: boolean;
    isLightMode: boolean;
    updateThemeName: (newThemeName: ThemeName) => void;
};
export default useTheme;
