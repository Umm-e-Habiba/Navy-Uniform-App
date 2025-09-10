import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Compponents/Home/Home";
import Header from "./Compponents/Header/Header";
import EditSection from "./Compponents/EditSection/EditSection";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDresses, setAllDressStates } from "./store/DressesSlice/dressesSlice";
import { AllUniforms, FemaleDresses, MaleDresses } from "./utils/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundPage from "./Compponents/NotFoundPage";
import { useNavigate } from "react-router-dom";

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {

        fetch('/some/hidden/resource')
        .then(res => {
        if (res.status === 403) {
            navigate("/404");
        }
        return res.json();
        })

        dispatch(
            setAllDressStates({
                allDresses: AllUniforms,
                maleDresses: MaleDresses,
                femaleDresses: FemaleDresses,
            })
        );
    }, [dispatch]);

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/edit" element={<EditSection />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                limit={1}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default App;
