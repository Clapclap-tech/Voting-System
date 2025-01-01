function register() {
    var username = document.getElementById("reg-username").value;
    var password = document.getElementById("reg-password").value;

    if (username && password) {
        localStorage.setItem(username, password);
        alert("Registration successful! You can now log in.");
        showLoginForm();
    } else {
        alert("Please fill out all fields.");
    }
}

function login() {
    var username = document.getElementById("login-username").value;
    var password = document.getElementById("login-password").value;

    var storedPassword = localStorage.getItem(username);

    if (storedPassword === password) {
        alert("Login successful! Welcome " + username);
        localStorage.setItem("loggedInUser", username);
        showMainContent(username);
    } else {
        alert("Login failed. Please check your username and password.");
    }
}

function showMainContent(username) {
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("main-section").style.display = "block";
    document.getElementById("username").innerText = username;
    document.getElementById("userhandle").innerText = "@" + username;
    renderTimeline();
}

function signOut() {
    localStorage.removeItem("loggedInUser");
    location.reload();
}

function showRegisterForm() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
}

function showLoginForm() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("register-form").style.display = "none";
}

function createPost() {
    const content = document.getElementById("post-content").value;
    const username = localStorage.getItem("loggedInUser");

    if (content.trim() === "") {
        alert("Post content cannot be empty.");
        return;
    }

    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const newPost = {
        username,
        handle: `@${username}`,
        content,
        timestamp: new Date().toLocaleString(),
    };

    posts.unshift(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));

    document.getElementById("post-content").value = ""; 
    renderTimeline(); 
}

// update timeline add ang post
function renderTimeline() {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const timeline = document.getElementById("timeline");

    timeline.innerHTML = ""; //clear text

    posts.forEach((post) => {
        const postCard = `
            <div class="ud-card">
                <div class="profile-section">
                    <img src="img/CTU_new_logo.png" alt="Profile Picture" class="profile-pic">
                    <div class="user-info">
                        <h2>${post.username}</h2>
                        <p>${post.handle} • ${post.timestamp}</p>
                    </div>
                </div>
                <div class="ud-content">
                    <p>${post.content}</p>
                </div>
                <div class="cta-actions">
                    <p>Reply • Share • Like</p>
                </div>
            </div>
        `;
        timeline.innerHTML += postCard;
    });
}

window.onload = function () {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        showMainContent(loggedInUser);
    } else {
        showLoginForm();
    }
};
