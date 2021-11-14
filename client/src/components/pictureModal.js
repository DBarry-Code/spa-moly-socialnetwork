import { uploadAvatar } from "../api";

export default function PictureModal({ closeModal, onAvatarUpload }) {
    function onSubmit(event) {
        event.preventDefault();
        uploadAvatar(event.target.avatar.files[0])
            .then(({ avatar_url }) => onAvatarUpload(avatar_url))
            .catch(() => alert("Error uploading avatar"));
    }

    function onModalClick(event) {
        if (!event.target.classList.contains("btn-close")) {
            return;
        }
        closeModal();
    }

    return (
        <div
            className="modal modal-sheet position-fixed d-block py-5 bg-dark bg-opacity-75"
            tabIndex="-1"
            role="dialog"
            id="modalSheet"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content rounded-6 shadow">
                    <div className="modal-header border-bottom-0 bg-dark mb-3">
                        <h5 className="modal-title text-white ">
                            Upload your Avatar
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={onModalClick}
                        ></button>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="modal-body py-0">
                            <input type="file" name="avatar" />
                        </div>
                        <div className="modal-footer flex-column border-top-0">
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary w-100 mx-0 mb-2"
                            >
                                Save Avatar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
