export declare type ThemeName = 'light' | 'dark';
declare function useTheme(): {
    themeName: ThemeName;
    isDarkMode: boolean;
    isLightMode: boolean;
};
export default useTheme;
