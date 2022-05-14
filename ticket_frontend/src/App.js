// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './firebase/Auth';
import { SnackbarProvider } from 'notistack';
// ----------------------------------------------------------------------

export default function App() {
  return (
    <AuthProvider>
      <SnackbarProvider>
      <ThemeConfig>
        <ScrollToTop />
        <GlobalStyles />
        <Router />
      </ThemeConfig>
      </SnackbarProvider>
    </AuthProvider>
  );
}
