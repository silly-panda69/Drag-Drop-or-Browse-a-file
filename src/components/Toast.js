import React from "react";

const Toast = ({ toastRef }) => {
    return (
        <div ref={toastRef} class="text-light toast align-items-center position-fixed top-0 start-0" style={{ marginTop: "70px", marginLeft: "10px",backgroundColor: "rgba(255, 0, 0, 0.5)" }} role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex px-2 align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                <div class="toast-body">
                    Some of the file you're trying to upload is not supported on our website.
                </div>
            </div>
        </div>
    );
}

export default Toast;