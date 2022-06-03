import Router from "./apps/Router";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FEC004",
    },
    secondary: {
      main: "#E8E8E8",
    },
    text: {
      primary: "#E8E8E8",
    },
    
  },
  typography: {
    fontFamily: "Montserrat"
  }
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </div>
  );
}

export default App;
