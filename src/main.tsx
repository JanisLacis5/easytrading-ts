import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {Provider} from "react-redux"
import {store} from "./store/store.js"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
        <ToastContainer position="top-center" autoClose={2000} />
        <App />
    </Provider>
)
