// Show/hide sections
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

// Update the form submission to also handle the logo file location
document.getElementById("election-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const electionName = document.getElementById("election-name").value;
    const startDate = document.getElementById("election-start-date").value;
    const endDate = document.getElementById("election-end-date").value;
    const logo = document.getElementById("election-logo").files[0];

    if (!electionName || !startDate || !endDate || !logo) {
        alert("Please fill out all fields before submitting.");
        return;
    }

    const logoName = logo ? logo.name : "No logo selected";

    const candidateImagePath = "Images\\" + logo.name;

    const message = `Election "${electionName}" created. Start Date: ${startDate}, End Date: ${endDate}. Logo: ${logoName}`;
    alert(message);

    saveToLocalStorage(electionName, [], startDate, endDate, candidateImagePath);
    document.getElementById("election-form").reset();
    createCandidatesTable(electionName, startDate, endDate, candidateImagePath);
});


// Function to create a candidates table for each election
function createCandidatesTable(electionName, startDate, endDate, electionLogo) {
    if (document.getElementById(`candidates-body-${electionName}`)) {
        alert(`Election "${electionName}" already exists!`);
        return;
    }

    const tableDiv = document.createElement('div');
    tableDiv.className = 'candidate-table';
    tableDiv.id = `election-table-${electionName}`; // Add a unique ID for deletion

    if (electionLogo) {
        const logoHTML = `
            <div style="text-align: center; margin-bottom: 10px;">
                <img src="${electionLogo}" alt="${electionName} Logo" style="width: 300px; height: auto; border-radius: 50%; display: inline-block;">
            </div>
        `;
        tableDiv.innerHTML = logoHTML + tableDiv.innerHTML; // Prepend the logo HTML to the tableDiv
    }
    
    const tableHeader = document.createElement('h3');
    tableHeader.innerHTML = `Candidates for ${electionName} <br> (Start Date: ${startDate}, End Date: ${endDate})`;

    // Create the Delete Election button
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.innerText = 'Delete Election';
    deleteButton.onclick = () => confirmDeleteElection(electionName);

    const headerContainer = document.createElement('div');
    headerContainer.style.display = 'flex';
    headerContainer.style.alignItems = 'center';
    headerContainer.style.justifyContent = 'space-between';

    headerContainer.appendChild(tableHeader);
    headerContainer.appendChild(deleteButton);

    tableDiv.appendChild(headerContainer);

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>Profile Picture</th>
        <th>Information</th>
        <th>Actions</th>
    `;
    table.appendChild(headerRow);

    const candidatesBody = document.createElement('tbody');
    candidatesBody.id = `candidates-body-${electionName}`;
    table.appendChild(candidatesBody);
    tableDiv.appendChild(table);
    document.getElementById('candidates-tables').appendChild(tableDiv);

    // Add candidate row (this is where users can add new candidates)
    const addCandidateRow = document.createElement('tr');
    addCandidateRow.innerHTML = `
        <td>
            <input type="file" id="candidate-image-${electionName}" accept="image/*">
            <input type="text" id="candidate-name-${electionName}" placeholder="Enter candidate's name">
            <input type="text" id="candidate-partylist-${electionName}" placeholder="Enter candidate's partylist">
            <input type="text" id="candidate-section-${electionName}" placeholder="Enter candidate's section">
        </td>
        <td>
            <select id="candidate-position-${electionName}">
                <option value="" disabled selected>Select candidate's position</option>
                <option>President</option>
                <option>Vice President</option>
                <option>Secretary</option>
                <option>Treasurer</option>
                <option>Auditor</option>
            </select>
            <select id="candidate-gender-${electionName}">
                <option value="" disabled selected>Select candidate's gender</option>
                <option>Male</option>
                <option>Female</option>
            </select>
            <input type="text" id="candidate-description-${electionName}" placeholder="Enter candidate's description">
        </td>
        <td>
            <button type="button" onclick="addCandidate('${electionName}')">+</button>
        </td>
    `;
    candidatesBody.appendChild(addCandidateRow);

    const manageCandidatesH2 = document.getElementById('manage-candidates-h2');
    manageCandidatesH2.textContent = 'Manage Candidates';
}

// Function to confirm election deletion
function confirmDeleteElection(electionName) {
    const confirmation = confirm(`Are you sure you want to delete the election "${electionName}"? This action cannot be undone.`);
    if (confirmation) {
        const electionTable = document.getElementById(`election-table-${electionName}`);
        if (electionTable) {
            electionTable.remove();
            let storedData = JSON.parse(localStorage.getItem('Election')) || {};
            delete storedData[electionName]; 
            localStorage.setItem('Election', JSON.stringify(storedData)); // Update localStorage
            alert(`Election "${electionName}" has been deleted.`);
        }
    }
}

function addCandidate(electionName) {
    const candidateName = document.getElementById(`candidate-name-${electionName}`).value;
    const candidatePosition = document.getElementById(`candidate-position-${electionName}`).value;
    const candidateImageFile = document.getElementById(`candidate-image-${electionName}`).files[0];
    const candidateGender = document.getElementById(`candidate-gender-${electionName}`).value;
    const candidatePartylist = document.getElementById(`candidate-partylist-${electionName}`).value;
    let candidateDescription = document.getElementById(`candidate-description-${electionName}`).value;
    const candidateSection = document.getElementById(`candidate-section-${electionName}`).value;

    if (!candidateName || !candidatePosition || !candidateImageFile || !candidateGender || !candidatePartylist || !candidateSection) {
        alert('Please fill out all fields!');
        return;
    }

    if (!candidateDescription) candidateDescription = "No description";

    const candidateImagePath = "Images/" + candidateImageFile.name;

    // Get the current stored election data
    let storedData = JSON.parse(localStorage.getItem('Election')) || {};
    let election = storedData[electionName]

    const candidate = {
        name: candidateName,
        position: candidatePosition,
        image: candidateImagePath,
        gender: candidateGender,
        partylist: candidatePartylist,
        votes: 0,
        description: candidateDescription,
        section: candidateSection,
        elected: "no"
    };

    election.candidates.push(candidate);
    saveToLocalStorage(electionName, election.candidates, election.startDate, election.endDate, election.logo);

    // Add the candidate row to the table
    const newRow = createCandidateRow(candidateName, candidatePosition, candidateImagePath, electionName, candidateGender, candidatePartylist, candidateDescription, candidateSection);
    const candidatesBody = document.getElementById(`candidates-body-${electionName}`);
    candidatesBody.insertBefore(newRow, candidatesBody.lastChild);

    // Reset input fields
    document.getElementById(`candidate-name-${electionName}`).value = '';
    document.getElementById(`candidate-position-${electionName}`).value = '';
    document.getElementById(`candidate-image-${electionName}`).value = '';
    document.getElementById(`candidate-gender-${electionName}`).value = '';
    document.getElementById(`candidate-partylist-${electionName}`).value = '';
    document.getElementById(`candidate-description-${electionName}`).value = '';
}


function createCandidateRow(name, position, image, electionName, gender, partylist, description, section) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${image}" alt="${name}" style="width: 150px; height: 150px; object-fit: cover; border-radius: 50%; display: block; margin: 0 auto;">   
            <p>${name}</p>
        </td>
        <td>
            <p>Partylist: ${partylist}</p>
            <p>Position: ${position}</p>
            <p>Gender: ${gender}</p>
            <p>Section: ${section}</p>
            <p>Description: ${description}</p>
        </td>
        <td>
            <button type="button" onclick="deleteCandidate('${electionName}', '${name}', this)">🗑️</button>
        </td>
    `;
    return row;
}

function deleteCandidate(electionName, name, button) {
    const row = button.closest('tr'); // Get the candidate row

    const confirmation = confirm(`Are you sure you want to delete the candidate "${name}"?`);

    if (!confirmation) {
        return;
    }

    row.remove();

    // Remove the candidate from localStorage
    let storedData = JSON.parse(localStorage.getItem('Election')) || {};
    let election = storedData[electionName];

    if (election && election.candidates) {
        // Filter out the candidate to delete
        election.candidates = election.candidates.filter(candidate => candidate.name !== name);
        localStorage.setItem('Election', JSON.stringify(storedData));
    }

    alert(`Candidate "${name}" has been deleted.`);
}


function saveToLocalStorage(electionName, candidates = [], startDate = null, endDate = null, logoURL = null) {
    let elections = JSON.parse(localStorage.getItem('Election')) || {};

    if (startDate && endDate) {
        elections[electionName] = { startDate, endDate, candidates: candidates, logo: logoURL || null };
    }

    // If candidates are provided, add them to the election's candidates array
    if (candidates.length > 0) {
        if (!elections[electionName]) {
            elections[electionName] = { startDate: "Unknown Start Date", endDate: "Unknown End Date", candidates: [], logo: null };
        }
        elections[electionName].candidates = candidates;
    }

    localStorage.setItem('Election', JSON.stringify(elections));
}

window.addEventListener('load', () => {
    const storedData = JSON.parse(localStorage.getItem('Election')) || {};
    for (const electionName in storedData) {
        const election = storedData[electionName];
        const startDate = election.startDate || "Unknown Start Date";
        const endDate = election.endDate || "Unknown End Date";

        const electionLogo = election.logo;
        createCandidatesTable(electionName, startDate, endDate, electionLogo);

        // Add candidates to the table
        election.candidates
            .filter(candidate => candidate !== null)
            .forEach(candidate => {
                const newRow = createCandidateRow(candidate.name, candidate.position, candidate.image, electionName, candidate.gender, candidate.partylist, candidate.description, candidate.section);
                const tableBody = document.getElementById(`candidates-body-${electionName}`);
                tableBody.insertBefore(newRow, tableBody.lastChild);
            });
    }
});
