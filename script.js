function setupVotingDropdown() {
    const votingToggle = document.getElementById('voting-toggle');
    const votingDropdown = document.getElementById('voting-dropdown');

    if (votingToggle && votingDropdown) {
        votingToggle.addEventListener('click', () => {
            votingDropdown.classList.toggle('active'); // Use 'active' to match the CSS class
        });
    } else {
        console.warn('Voting toggle or dropdown element is missing!');
    }
}


// Call the function to set up the dropdown
setupVotingDropdown();

// JavaScript for smooth transitions and login/signup handling

document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login-btn");
    const signupLink = document.getElementById("signup-link");
    const authSection = document.getElementById("auth-section");
    const homepage = document.getElementById("homepage");
    const logoutBtn = document.getElementById("logout-btn");

    // Switch to signup mode
    signupLink.addEventListener("click", () => {
        document.querySelector("h2").textContent = "Create an Account";
        loginBtn.textContent = "Sign up";
        signupLink.style.display = "none";
    });

    // Handle login or signup
    loginBtn.addEventListener("click", () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (loginBtn.textContent === "Sign up") {
            if (username && password) {
                localStorage.setItem(username, password);
                alert("Account created! You can now log in.");
                location.reload();  // Reload the page to simulate login after signup
            } else {
                alert("Please fill in both fields!");
            }
        } else {
            if (username && password) {
                const storedPassword = localStorage.getItem(username);
                if (storedPassword && storedPassword === password) {
                    authSection.style.opacity = "0";
                    setTimeout(() => {
                        authSection.style.display = "none";
                        homepage.style.display = "flex";
                        homepage.style.opacity = "1";
                    }, 400);
                    alert("Login successful!");
                } else {
                    alert("Invalid username or password.");
                }
            } else {
                alert("Please fill in both fields!");
            }
        }
    });

    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent default navigation
            localStorage.removeItem("username");
            authSection.style.display = "block"; // Show login
            homepage.style.display = "none"; // Hide homepage
            alert("You have logged out. Please log in again.");
            // Redirect to login page
            window.location.href = "index.html";
        });
    }

    // Function to set up the voting dropdown
    function setupVotingDropdown() {
        const votingToggle = document.getElementById('voting-toggle');
        const votingDropdown = document.getElementById('voting-dropdown');
        if (votingToggle && votingDropdown) {
            votingToggle.addEventListener('click', () => {
                votingDropdown.classList.toggle('active'); // Toggle the dropdown visibility
            });
        } else {
            console.warn('Voting toggle or dropdown element is missing!');
        }
    }

    // Call the function to set up the dropdown
    setupVotingDropdown();

    // Handle "Election Details" and "Manage Elections"
    const activeElectionsLink = document.getElementById('active-elections');
    const manageElectionsLink = document.getElementById('manage-elections');
    const mainContent = document.querySelector('.main-content');

    // Event listener for "Manage Elections"
    manageElectionsLink.addEventListener('click', function () {
        // Clear the previous content if any
        mainContent.innerHTML = '';

        // Create the new iframe for Manage Elections
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', 'Elections/Dalman.html'); // Source of the iframe for Manage Elections
        iframe.setAttribute('style', 'width: 100%; height: 100%; border: none;');

        // Append the new iframe to the main content
        mainContent.appendChild(iframe);
    });

    const votingToggle = document.getElementById('voting-toggle');

    // Event listener for "Elections"
    votingToggle.addEventListener('click', function () {
        // Clear the previous content if any
        mainContent.innerHTML = '';

        // Create the new iframe for Elections
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', 'Elections/harold.html'); // Your specific file for elections
        iframe.setAttribute('style', 'width: 100%; height: 100%; border: none;');

        // Append the new iframe to the main content
        mainContent.appendChild(iframe);
    });
});
