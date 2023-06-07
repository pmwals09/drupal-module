import { GlobalEventProvider } from "./GlobalEventContext.jsx";
import { SpeechContextProvider } from "./SpeechContext.jsx";
import { FocusContextProvider } from "./FocusContext.jsx";
import { HelpContextProvider } from "./HelpContext.jsx";

// eslint-disable-next-line react/prop-types
function Contexts({ children }) {
  return (
    <GlobalEventProvider>
      <SpeechContextProvider>
        <HelpContextProvider>
          <FocusContextProvider>{children}</FocusContextProvider>
        </HelpContextProvider>
      </SpeechContextProvider>
    </GlobalEventProvider>
  );
}

export default Contexts;
