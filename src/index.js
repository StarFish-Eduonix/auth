import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import InstaProvider from "./context/InstaProvider";

import App from "./App";


ReactDOM.render(
    <InstaProvider>
        <BrowserRouter>
           <App />
       </BrowserRouter>
   </InstaProvider>

, document.getElementById("root"));