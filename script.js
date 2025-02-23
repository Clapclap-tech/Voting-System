document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login-btn");
    const signupLink = document.getElementById("signup-link");
    const authSection = document.getElementById("auth-section");
    const homepage = document.getElementById("homepage");
    const logoutBtn = document.getElementById("logout-btn");
    const mainContent = document.querySelector(".main-content");
    const userNameElement = document.querySelector(".user-name");
    const userRoleElement = document.querySelector(".user-role");
    const userAvatarElement = document.querySelector(".user-avatar");

    function getStoredAccounts() {
        return JSON.parse(localStorage.getItem("accountVoting")) || [];
    }

    function saveAccount(account) {
        let accounts = getStoredAccounts();
        accounts.push(account);
        localStorage.setItem("accountVoting", JSON.stringify(accounts));
    }

    function findAccount(username, password) {
        return getStoredAccounts().find(acc => acc.username === username && acc.password === password);
    }

    function ensureAdminAccount() {
        let accounts = getStoredAccounts();
        if (!accounts.some(acc => acc.username === "admin")) {
            saveAccount({ username: "admin", password: "admin", role: "admin", img: "Images\\hecker.jpg" });
        }
    }

    ensureAdminAccount();

    // Check if user is already logged in by reading settingsVoting from localStorage
    const settingsVoting = JSON.parse(localStorage.getItem("settingsVoting"));
    if (settingsVoting && settingsVoting.isLogin === true) {
        authSection.style.display = "none";
        homepage.style.display = "flex";
        userNameElement.textContent = settingsVoting.username;
        userRoleElement.textContent = settingsVoting.role.charAt(0).toUpperCase() + settingsVoting.role.slice(1);
        userAvatarElement.src = settingsVoting.img;
        showIFrame("Elections/home.html");
    }

    signupLink.addEventListener("click", () => {
        document.querySelector("h2").textContent = "Create an Account";
        loginBtn.textContent = "Sign up";
        signupLink.style.display = "none";
    });

    loginBtn.addEventListener("click", () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (loginBtn.textContent === "Sign up") {
            if (username && password) {
                let accounts = getStoredAccounts();
                if (accounts.some(acc => acc.username === username)) {
                    alert("Username already exists!");
                    return;
                }
                saveAccount({ username, password, role: "Student", img: "Images/pfp.png" });
                alert("Account created! You can now log in.");
                location.reload();
            } else {
                alert("Please fill in both fields!");
            }
        } else {
            let account = findAccount(username, password);
            if (account) {
                localStorage.setItem("settingsVoting", JSON.stringify({
                    username: account.username,
                    password: account.password,
                    role: account.role,
                    img: account.img,
                    isDarkMode: false,
                    isLogin: true
                }));

                authSection.style.opacity = "0";
                setTimeout(() => {
                    authSection.style.display = "none";
                    homepage.style.display = "flex";
                    homepage.style.opacity = "1";
                    userNameElement.textContent = account.username;
                    userRoleElement.textContent = account.role.charAt(0).toUpperCase() + account.role.slice(1);
                    userAvatarElement.src = account.img;
                }, 400);
                alert("Login successful!");
                showIFrame("Elections/home.html");
            } else {
                alert("Invalid username or password.");
            }
        }
    });

    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("settingsVoting"); // Remove current logged-in account settings
            authSection.style.display = "block";
            homepage.style.display = "none";
            alert("You have logged out. Please log in again.");
            window.location.href = "index.html";
        });
    }

    function showIFrame(iframeSrc) {
        mainContent.innerHTML = "";
        const iframe = document.createElement("iframe");
        iframe.setAttribute("src", iframeSrc);
        iframe.setAttribute("style", "width: 100%; height: 100%; border: none;");
        mainContent.appendChild(iframe);
    }

    document.getElementById("home-page").addEventListener("click", function () {
        showIFrame("Elections/home.html");
    });

    document.getElementById("manage-elections").addEventListener("click", function () {
        showIFrame("Elections/dalman.html");
    });

    document.getElementById("voting-toggle").addEventListener("click", function () {
        showIFrame("Elections/harold&jose.html");
    });

    document.getElementById("result-page").addEventListener("click", function () {
        showIFrame("Result-Dashboard--main/Result-Dashboard--main/Results Page/main/mainpage.html");
    });

    document.getElementById("settings-page").addEventListener("click", function () {
        showIFrame("Elections/JL.html");
    });
});
