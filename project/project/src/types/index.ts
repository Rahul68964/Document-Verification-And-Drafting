export interface User {
  username: string;
  password: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}