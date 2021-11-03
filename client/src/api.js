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

module.exports = {
    loginUser,
    registerUser,
};
