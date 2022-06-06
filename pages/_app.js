import "../styles/globals.css";
import { store } from "../state/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
