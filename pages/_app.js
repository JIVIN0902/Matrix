import "../styles/globals.css";
import { store } from "../state/store";
import { Provider } from "react-redux";
import "nextjs-orgchart/dist/ChartContainer.css";
import "nextjs-orgchart/dist/ChartNode.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
