import NavigationDrawer from "@Components/NavigationDrawer";
import Header from "@Components/Header";
import NavContent from "./components/NavContent"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'video-react/dist/video-react.css';
import "react-perfect-scrollbar/dist/css/styles.css"
import 'antd/dist/antd.css'
import "@Styles/style.css"
import "@Styles/fonts.css"
import "@Styles/animation.css"
import "@Styles/style-input.scss"
import "@Styles/style-btn.scss"
import "@Styles/typography.scss"
import "@Styles/markupHelpers.scss"
import "@Styles/colors.css"
import {useCallback, useState} from "react";
import Login from "./pages/LoginPage";


function App() {
  const [widthPage, setWidthPage] = useState()

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setWidthPage(node.clientWidth)
    }
  }, [widthPage, setWidthPage]);
  return (
      <BrowserRouter>
        <div className="flex-row flex h-full w-full" ref={measuredRef}>

          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={() => (
                <>
                  <NavigationDrawer  widthPage={widthPage}/>
                  <div className="flex-container relative w-full overflow-hidden">
                    <Header/>
                    <NavContent />
                  </div>
                </>
            )} />
          </Switch>

        </div>
      </BrowserRouter>
  );
}

export default App;
