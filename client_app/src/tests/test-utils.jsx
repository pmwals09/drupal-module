import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { getConfiguredStore } from "../redux/store.js";
import { GlobalEventProvider } from "../container/GlobalEventContext.jsx";
import { SpeechContextProvider } from "../container/SpeechContext.jsx";
import { FocusContextProvider } from "../container/FocusContext.jsx";

// eslint-disable-next-line react/prop-types
function AllProviders({ children, context = {} }) {
  return (
    /* eslint-disable-next-line react/prop-types, react/jsx-props-no-spreading */
    <MemoryRouter {...(context.browserRouter || {})}>
      <Provider store={getConfiguredStore(context.redux || {})}>
        <GlobalEventProvider>
          <SpeechContextProvider>
            <FocusContextProvider>{children}</FocusContextProvider>
          </SpeechContextProvider>
        </GlobalEventProvider>
      </Provider>
    </MemoryRouter>
  );
}

function customRender(ui, options = {}) {
  const { context, ...rest } = options;
  return render(<AllProviders context={context}>{ui}</AllProviders>, rest);
}

export * from "@testing-library/react";
export { customRender as render };

// NOTE: This is just a quick helper so I'm hardcoding as little as possible.
// it won't handle, e.g., 8-digit hex codes to rgba, nor 3-digit hex shorthand
export function hexToRgb(hex) {
  const [, r, g, b] = hex.match(/^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  return `rgb(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)})`;
}
