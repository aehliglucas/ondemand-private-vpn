async function send_auth(data) {
    const response = await fetch('http://127.0.0.1:3001/auth', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    return response.json()
}

function auth() {
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;
    post_data = JSON.stringify({ "user": username, "pass": password });

    send_auth(post_data).then((res) => {
        if (res.result == "success") {
            sessionStorage.setItem("opvpn-session", res.session)
            window.location.replace("/manage.html")
        } else {
            console.log("Error")
        }
    })
}