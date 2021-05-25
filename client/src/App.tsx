import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import React from "react";
import "./App.css";
import ContextMaster from "./Components/ContextMaster";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FF7A2F", //Orange
    },
    secondary: {
      main: "#000000", //Black
      light: "#EDEDED", //Light Grey
      dark: "#393939", //Dark Grey
    },
  },
});



function App() {
  return (
    <ThemeProvider theme={theme}>
      <ContextMaster />
    </ThemeProvider>
  );
}

export default App;
