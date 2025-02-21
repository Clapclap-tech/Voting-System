document.addEventListener('DOMContentLoaded', () => {
    const electionData = JSON.parse(localStorage.getItem('Election')); // Retrieve the data from localStorage

    if (electionData) {
        Object.keys(electionData).forEach(election => {
            const { candidates } = electionData[election];

            // Populate each candidate
            candidates.forEach(candidate => createCandidateCard(candidate));
        });
    }
});

function createCandidateCard({ name, position, section, image, gender, partylist, description }) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <img src="${image}" alt="${name}">
        <h2>${name}</h2>
        <h3>${position}</h3>
        <h4>Section: ${section}</h4>
        <p>${description}</p>
        <p>Gender: ${gender}</p>
        <p>Partylist: ${partylist}</p>
    `;
    document.getElementById('candidate-cards').appendChild(card);
}

// Status Popup
function toggleStatusPopup() {
    const statusPopup = document.getElementById('statusPopup');
    const statusOverlay = document.getElementById('statusOverlay');
    statusPopup.classList.toggle('show');
    statusOverlay.classList.toggle('show');
}

function setStatus(status, color) {
    const statusText = document.querySelector('.status-text');
    statusText.textContent = status;
    statusText.style.color = color;
    toggleStatusPopup(); // Close the popup after selection
}
