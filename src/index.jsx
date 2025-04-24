import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";

import { Home } from "./pages/home/index.jsx";
import { Login } from "./pages/Login/index.jsx";
import { NotFound } from "./pages/_404.jsx";
import { Header } from "./components/Header.jsx";
import "./style.css";

export function App() {
  return (
    <LocationProvider>
      <div id="app">
        <Header />
        <main>
          <Router>
            <Route path="/" component={Login} />
            <Route path="/home" component={Home} />
            <Route default component={NotFound} />
          </Router>
        </main>
      </div>
    </LocationProvider>
  );
}

render(<App />, document.getElementById("app"));