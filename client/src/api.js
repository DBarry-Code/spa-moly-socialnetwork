function loginUser({ email, password }) {
    return new Promise((resolve, reject) => {
        fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.status >= 400) {
                response.json().then(reject);
                return;
            }
            response.json().then(resolve);
        });
    });
}

function registerUser({ first_name, last_name, email, password }) {
    return new Promise((resolve, reject) => {
        fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ first_name, last_name, email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.status >= 400) {
                response.json().then(reject);
                return;
            }
            response.json().then(resolve);
        });
    });
}

function uploadAvatar(file) {
    return new Promise((resolve, reject) => {
        const body = new FormData();
        body.append("avatar", file);
        fetch("api/users/me/avatar", {
            method: "POST",
            body,
        }).then((response) => {
            if (response.status >= 400) {
                response.json().then(reject);
                return;
            }
            response.json().then(resolve);
        });
    });
}

async function updateBio(bio) {
    const response = await fetch("api/users/me/bio", {
        method: "POST",
        body: JSON.stringify({ bio }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if (response.status >= 400) {
        throw data.message;
    }
    return data;
}

async function checkUserforPwReset(email) {
    const response = await fetch("api/password/reset/start", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if (response.status >= 400) {
        throw data.message;
    }
    return data;
}

async function comfirmNewPassword(email, code, password) {
    const response = await fetch("api/password/reset/comfirm", {
        method: "POST",
        body: JSON.stringify({ email, code, password }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if (response.status >= 400) {
        throw data.message;
    }
    return data;
}

async function getRecentUsers() {
    const response = await fetch("api/users/recent?limit=3");
    const data = await response.json();
    if (response.status >= 400) {
        console.log(data);
    }
    return data;
}

async function searchUsers(q) {
    const response = await fetch("api/users/search?q=" + q);
    const data = await response.json();
    if (response.status >= 400) {
        throw data.message;
    }
    return data;
}

async function getUserbyId(id) {
    const response = await fetch("/api/user/" + id);
    const data = await response.json();
    console.log(data);
    if (response.status >= 400) {
        throw data.message;
    }
    return data;
}

module.exports = {
    loginUser,
    registerUser,
    uploadAvatar,
    updateBio,
    checkUserforPwReset,
    comfirmNewPassword,
    getRecentUsers,
    searchUsers,
    getUserbyId,
};
