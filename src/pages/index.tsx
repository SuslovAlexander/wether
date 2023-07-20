import { Route, Routes } from "react-router-dom";

import General from "./General/General";
import HomePage from "./HomePage/HomePage";
import SettingsPage from "./SettingsPage/SettingsPage";
import ForecastPage from "./ForecastPage/ForecastPage";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<General />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/forecast" element={<ForecastPage />} />
      </Route>
    </Routes>
  );
};

export default Routing;
