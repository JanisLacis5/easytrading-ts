import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AppContext from "./context/globalContext.jsx"
import {Provider} from "react-redux"
import {store} from "./store/store.js"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <AppContext>
        <ToastContainer position="top-center" autoClose={2000} />
        <Provider store={store}>
            <App />
        </Provider>
    </AppContext>
)
