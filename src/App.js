import React from 'react';
import Dashboard from "./page/Dashboard";

import {BrowserRouter as Router,Route} from "react-router-dom";

function App() {

  return (
    <Router>
      <Route path="/" component={Dashboard} exact />
    </Router>
  );
}

export default App;
