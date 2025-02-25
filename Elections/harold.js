document.addEventListener('DOMContentLoaded', () => {
    // Toggle sidebar
    const toggleButton = document.querySelector('.toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');

    if (toggleButton && sidebar) {
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
        });
    }

    const electionData = {
        "SSG Council Election": {
          "startDate": "2024-12-05",
          "endDate": "2024-12-16",
          "candidates": [
            {
              "name": "kenjie",
              "position": "President",
              "image": "Images/pfp.png",
              "gender": "Male",
              "partylist": "com e",
              "votes": 4,
              "description": "No description",
              "section": "bscpe 3 day",
              "elected": false
            },
            {
              "name": "bryan",
              "position": "President",
              "image": "Images/pfp.png",
              "gender": "Male",
              "partylist": "com e",
              "votes": 3,
              "description": "No description",
              "section": "bscpe 3 day",
              "elected": false
            },
            {
              "name": "khitsly",
              "position": "Vice President",
              "image": "Images/pfp.png",
              "gender": "Male",
              "partylist": "hacker",
              "votes": 3,
              "description": "No description",
              "section": "bscpe 3 day",
              "elected": false
            },
            {
              "name": "harold",
              "position": "Vice President",
              "image": "Images/pfp.png",
              "gender": "Male",
              "partylist": "hacker",
              "votes": 2,
              "description": "No description",
              "section": "bscpe 3 day",
              "elected": false
            }
          ],
          "logo": "Images\\SSG.png"
        },
        "Engineering Society Election": {
          "startDate": "2024-12-05",
          "endDate": "2024-12-20",
          "candidates": [],
          "logo": "Images\\ES.png"
        },
        "ICPEP Election": {
          "startDate": "2025-01-02",
          "endDate": "2025-01-11",
          "candidates": [],
          "logo": "Images\\ICPEP.png"
        },
        "bscpe2": {
          "startDate": "2026-12-26",
          "endDate": "2026-01-18",
          "candidates": [],
          "logo": "Images\\ICPEP.png"
        },
        "bulldogan": {
          "startDate": "2026-01-16",
          "endDate": "2026-01-25",
          "candidates": [],
          "logo": "Images\\ES.png"
        }
      };
      
      // Check if "Election" exists in localStorage
      if (!localStorage.getItem("Election")) {
        localStorage.setItem("Election", JSON.stringify(electionData));
      }      

    // Load elections and populate cards
    const storedData = JSON.parse(localStorage.getItem('Election')) || {};
    const today = new Date().toISOString().split('T')[0];

    for (const electionName in storedData) {
        const election = storedData[electionName];
        const electionStartDate = election.startDate || "Unknown Start Date";
        const electionEndDate = election.endDate || "Unknown End Date";
        const electionLogoUrl = election.logo || '';

        const sectionId = electionStartDate <= today ? 'active-elections' : 'upcoming-elections';
        addElectionCard(electionName, electionStartDate, electionEndDate, electionLogoUrl, sectionId);
    }
});

// Make showSection globally available
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }
}

// Function to dynamically add election cards
function addElectionCard(electionName, electionStartDate, electionEndDate, electionLogoUrl, sectionId) {
    const section = document.getElementById(sectionId);

    const electionCardHTML = `
        <div class="election-card">
            <div class="election-header">
                <img src="${electionLogoUrl}" alt="Election Logo" class="election-logo">
                <div class="header-content">
                    <div class="election-info">
                        <h3>${electionName}</h3>
                        <p>Starts on: ${electionStartDate}</p>
                        <p>Ends on: ${electionEndDate}</p>
                    </div>
                    <div class="card-buttons">
                        <button onclick="showSection('view-details'); viewDetails('${electionName}')">View Details</button>
                        <button onclick="showSection('vote-elections'); showElectionsVote('${electionName}')">Cast Vote</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    section.insertAdjacentHTML('beforeend', electionCardHTML);
}

function viewDetails(electionKey) {
    const storedData = JSON.parse(localStorage.getItem('Election')) || {};
    const election = storedData[electionKey];

    if (!election || !election.candidates || election.candidates.length === 0) {
        alert(`No candidates found for ${electionKey}`);
        showSection('main-elections');
        return;
    }

    const mainContent = document.getElementById('view-details-list');
    mainContent.innerHTML = '';

    const header = document.createElement('header');
    header.innerHTML = `
        <h1>${electionKey} Partylists and Candidates Information</h1>
        <p>Select your preferred candidate from the party list.</p>
    `;
    mainContent.appendChild(header);

    const section = document.createElement('section');
    section.className = 'party-list';

    // Group candidates by partylist
    const parties = {};
    election.candidates.forEach(candidate => {
        if (!parties[candidate.partylist]) {
            parties[candidate.partylist] = [];
        }
        parties[candidate.partylist].push(candidate);
    });

    // Create containers for each partylist
    for (const [partylist, candidates] of Object.entries(parties)) {
        const partyContainer = document.createElement('div');
        partyContainer.className = 'party-container';
        partyContainer.innerHTML = `<h2>Partylist: ${partylist}</h2>`;

        const ul = document.createElement('ul');

        candidates.forEach(candidate => {
            const li = document.createElement('li');
            li.className = 'candidate-card'; // Add a class for styling
            li.innerHTML = `
                <div class="candidate-image">
                    <img src="${candidate.image}" alt="${candidate.name}">
                </div>
                <div class="candidate-details">
                    <h3>${candidate.position}: ${candidate.name}</h3>
                    <p><span>Party Affiliation:</span> ${candidate.partylist}</p>
                    <p><span>Gender:</span> ${candidate.gender}</p>
                    <p><span>Section:</span> ${candidate.section}</p>
                    <p><span>Description:</span> ${candidate.description}</p>
                </div>
            `;
            ul.appendChild(li);
        });

        partyContainer.appendChild(ul);
        section.appendChild(partyContainer);
    }

    mainContent.appendChild(section);

    const button = document.createElement('button');
    button.style.marginBottom = '50px';
    button.innerHTML = 'Cast Vote';
    button.setAttribute(
        'onclick',
        `showSection('vote-elections'); showElectionsVote('${electionKey}')`
    );
    mainContent.appendChild(button);
}


function showElectionsVote(electionKey) {
    const storedData = JSON.parse(localStorage.getItem('Election')) || {};
    const election = storedData[electionKey];

    if (!election || !election.candidates || election.candidates.length === 0) {
        alert(`No candidates found for ${electionKey}`);
        showSection('main-elections');
        return;
    }

    const candidateList = document.getElementById('candidate-list');
    candidateList.innerHTML = ''; // Clear previous content

    const header = document.createElement('header');
    header.innerHTML = `
        <h1>Vote for ${electionKey}</h1>
        <p>Vote for your candidates now!</p>
    `;
    candidateList.appendChild(header);

    const positionMap = election.candidates
        .filter(candidate => candidate && candidate.name && candidate.position) // Filter invalid candidates
        .reduce((map, candidate) => {
            if (!map[candidate.position]) {
                map[candidate.position] = [];
            }
            map[candidate.position].push(candidate);
            return map;
        }, {});

    let content = '';

    for (const position in positionMap) {
        content += `<h3>${position} Position</h3><div class="radio-group">`;

        positionMap[position].forEach(candidate => {
            content += `
                <div class="candidate">
                    <input type="radio" name="${position}" value="${candidate.name}" 
                        data-id="${candidate.name}-${candidate.position}" 
                        data-party="${candidate.partylist}" 
                        data-position="${candidate.position}" 
                        data-name="${candidate.name}">
                    <label>${candidate.name} 
                        <span class="unbold"><i>Party List: ${candidate.partylist}</i></span>
                    </label>
                </div>`;
        });

        content += `</div><br>`;
    }

    content += `
        <div class="button-container">
            <button id="cast-votes" onclick="increVote('${electionKey}')">Cast Votes</button>
        </div>`;
    candidateList.innerHTML += content; // Append generated content
}

function increVote(electionKey) {
    const storedData = JSON.parse(localStorage.getItem('Election')) || {};
    const election = storedData[electionKey];

    if (!election || !election.candidates || election.candidates.length === 0) {
        alert(`No candidates found on ${electionKey}`);
        return;
    }

    const selectedCandidates = [];

    const selectedRadios = document.querySelectorAll('input[type="radio"]:checked');
    if (selectedRadios.length === 0) {
        alert("Please select a candidate to vote for.");
        return;
    }

    selectedRadios.forEach(radio => {
        const candidateName = radio.value;
        const candidatePosition = radio.getAttribute('data-position');
        const candidateParty = radio.getAttribute('data-party');

        const candidate = election.candidates.find(c => c.name === candidateName && c.position === candidatePosition && c.partylist === candidateParty);

        if (candidate) {
            selectedCandidates.push(candidate);
        }
    });

    selectedCandidates.forEach(candidate => {
        candidate.votes = (candidate.votes || 0) + 1;
    });

    storedData[electionKey] = election;
    localStorage.setItem('Election', JSON.stringify(storedData));

    alert(`Thank you for your voting!`);
    showSection('main-elections')
}
