import NavigationDrawer from "@Components/NavigationDrawer";
import Header from "@Components/Header";
import NavContent from "./components/NavContent"
import { BrowserRouter } from "react-router-dom";
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
          <NavigationDrawer  widthPage={widthPage}/>
          <div className="flex-container relative w-full overflow-hidden">
            <Header/>
            <NavContent />
          </div>
        </div>
      </BrowserRouter>
  );
}

export default App;
