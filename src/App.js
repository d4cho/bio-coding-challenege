import { Switch, Route, BrowserRouter } from "react-router-dom";

import Places from "./pages/Places/Places";
import PlacesDetails from "./pages/PlacesDetails/PlacesDetails";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    exact
                    path="/places/:placeId"
                    component={PlacesDetails}
                />
                <Route path={["/", "/places"]} component={Places} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
