import { createPortal } from "react-dom";
import Backdrop from "./Backdrop/Backdrop";

function ReactPortal({ children, wrapperId, closePortal }) {
    return createPortal(
        <Backdrop closePortal={closePortal}>{children}</Backdrop>,
        document.getElementById(wrapperId)
    );
}
export default ReactPortal;
