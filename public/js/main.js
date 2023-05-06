async function get_user_data(session) {
    const response = await fetch('http://127.0.0.1:3001/user_data', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Session-ID': session,
        },
    });

    return response.json()
}

function check_session() {
    session = sessionStorage.getItem("opvpn-session")
    if (!session) {
        window.location.replace("http://127.0.0.1:5500/login.html")
    }
    get_user_data(session).then((res) => {
        if (res.status == "ok") {
            if (res.first_name != "") {
                document.getElementById("header-name").innerHTML = `Welcome back, ${res.first_name}!`
            } else {
                document.getElementById("header-name").innerHTML = "Welcome back!"
            }
        } else {
            window.location.replace("http://127.0.0.1:5500/login.html")
        }
    })
}

document.addEventListener('DOMContentLoaded', check_session)