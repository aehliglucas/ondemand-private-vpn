const session = sessionStorage.getItem("opvpn-session")
var active_vpn_sessions = ""

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

async function get_vpn_data(session) {
    const response = await fetch('http://127.0.0.1:3001/vpn_data', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Session-ID': session
        },
    });

    return response.json()
}

function init_user_session() {
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

    get_vpn_data(session).then((res) => {
        active_vpn_sessions = res
        set_start_button("fi")
    })
}

function start_session() {
    region = document.getElementById("select-region").value
}

function join_session(region) {
    region = document.getElementById("select-region").value
}

function set_start_button(region) {
    status_paragraph = document.getElementById("region-status")
    btn = document.getElementById("button-start")
    if (active_vpn_sessions[region]["active"] == "true") {
        btn.innerHTML = "Join active Session"
        btn.setAttribute("onclick", "join_session()")
        status_paragraph.innerHTML = 
            `There is currently an active session in this region:<br />
            Started by: ${active_vpn_sessions[region]["started_by"]}<br />
            Started at: ${active_vpn_sessions[region]["started_at"]}<br /><br />
            Feel free to join the session by clicking the button below:`
    } else {
        btn.innerHTML = "Start Session"
        btn.setAttribute("onclick", "start_session()")
        status_paragraph.innerHTML = 
            `There are currently no active sessions in this region.<br />
            Feel free to start a new one by clicking the button below:`
    }
}

function set_region() {
    // Obtain the value of the dropdown field
    selected_region = document.getElementById("select-region").value
    
    // Remove the previous flag icon and create a new one
    document.getElementById("region-flag").remove()
    var parent = document.getElementById("region")
    var flag_icon = document.createElement("img")
    flag_icon.id = "region-flag"
    flag_icon.classList.add("flag-icon")
    
    // Set the image source according to the selected region
    if (selected_region == "fi") {
        flag_icon.src = "/img/flag_icon_fi.png"
    } else if (selected_region == "us-east" || selected_region == "us-west") {
        flag_icon.src = "/img/flag_icon_us.png"
    }
    
    // Add the image to the parent div (id region)
    parent.appendChild(flag_icon)
    set_start_button(selected_region)
}

function close_user_session() {
    sessionStorage.removeItem("opvpn-session")
    window.location.href = "http://127.0.0.1:5500/login.html"
}

document.addEventListener('DOMContentLoaded', init_user_session)