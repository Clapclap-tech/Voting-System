
// refresh results*
/*function refreshResults() {
   fetch('/path/to/your/api/endpoint')
      .then(response => response.json())
      .then(data => {
         if (data && Array.isArray(data.candidates)) {
            updateResults(data);
            analyzeVotes(data);
         } else {
            console.error('Invalid data structure received');
         }
      })
      .catch(error => console.error('Error fetching data:', error));
}*/

// update results table
function updateResults(data) {
    var tbody = document.querySelector('.results-table tbody');
    tbody.innerHTML = '';
 
    data.candidates.forEach(candidate => {
       var row = document.createElement('tr');
 
 
       row.innerHTML = `
         <td>${candidate.votePercentage}</td>
         <td>
           <img src="${candidate.photo || 'default.jpg'}" alt="Photo of ${candidate.name}" style="width: 20px!important; height: 20px!important; border-radius: 50%; margin-right: 10px;">
           ${candidate.name || 'N/A'}
         </td>
         <td>${candidate.gender || 'N/A'}</td>
         <td>${candidate.party || 'N/A'}</td>
         <td class="${candidate.elected === 'Yes' ? 'elected-yes' : 'elected-no'}">${candidate.elected}</td>
         <td>
           <div class="vote-bar-container" style="position: relative; height: 10px; background-color: #ddd;">
             <span style="position: absolute; left: 0; color: #333; font-weight: bold;">${candidate.votePercentage}%</span>
             <div class="vote-bar" style="width: ${candidate.votePercentage}; background-color: #4caf50; height: 100%;"></div>
           </div>
         </td>
         <td>${candidate.totalVotes}</td>
       `;
       tbody.appendChild(row);
    });
 }
 
 // display margin and vote analysis*
 function analyzeVotes(data) {
    const candidates = data.candidates;
 
    if (Array.isArray(candidates) && candidates.length >= 2) {
       const sortedCandidates = candidates.sort((a, b) => b.totalVotes - a.totalVotes);
       const leader = sortedCandidates[0];
       const runnerUp = sortedCandidates[1];
       const margin = leader.totalVotes - runnerUp.totalVotes;
       const marginPercentage = ((margin / leader.totalVotes) * 100).toFixed(2);
 
       // . margin results
       document.querySelector('#marginResult').innerHTML = `
         <p><strong>Vote Margin:</strong> ${margin} votes</p>
         <p><strong>Margin Percentage:</strong> ${marginPercentage}%</p>
         <p><strong>Leading Candidate:</strong> ${leader.name} (${leader.party})</p>
         <p><strong>Runner-Up:</strong> ${runnerUp.name} (${runnerUp.party})</p>
       `;
    } else {
       console.warn('Not enough candidates to analyze margin');
    }
 }
 
 
 //setInterval(refreshResults, 10000);
 
 // Fetch and populate dropdown filters
 /*async function populateFilters() {
    try {
       const response = await fetch('/api/filters');
       const data = await response.json();
 
       const typeSelect = document.querySelector('select[name="type"]');
       const yearSelect = document.querySelector('select[name="year"]');
 
       if (data.types && Array.isArray(data.types)) {
          data.types.forEach(type => {
             const option = document.createElement('option');
             option.textContent = type;
             typeSelect.appendChild(option);
          });
       } else {
          console.error('Invalid data format for types');
       }
 
       if (data.years && Array.isArray(data.years)) {
          data.years.forEach(year => {
             const option = document.createElement('option');
             option.textContent = year;
             yearSelect.appendChild(option);
          });
       } else {
          console.error('Invalid data format for years');
       }
    } catch (error) {
       console.error('Error populating filters:', error);
    }
 }
 
 document.addEventListener('DOMContentLoaded', populateFilters);
 
 */
 
 document.addEventListener("DOMContentLoaded", function() {
 
    const typeDropdown = document.getElementById("typeDropdown");
    const positionDropdown = document.getElementById("positionDropdown");
    const resultsTbody = document.getElementById("results-tbody");
 
    if (!typeDropdown || !positionDropdown || !resultsTbody) {
       console.error("Required elements are missing.");
       return;
    }
 
    // Populate Type dropdown
    Object.keys(election).forEach(election => {
       const option = document.createElement("option");
       option.value = election;
       option.textContent = election;
       typeDropdown.appendChild(option);
    });
 
    typeDropdown.addEventListener("change", function() {
       
       resultsTbody.innerHTML = '';
 
       const selectedElection = election[this.value];
 
       // Clear position dropdo
       positionDropdown.innerHTML = '<option value="">Select Position</option>';
 
       if (selectedElection) {
          
          Object.keys(selectedElection).forEach(position => {
             const option = document.createElement("option");
             option.value = position;
             option.textContent = position;
             positionDropdown.appendChild(option);
          });
       } else {
          resultsTbody.innerHTML = `
          <tr>
             <td colspan="7">No positions available for this election type.</td>
          </tr>
        `;
       }
    });
 
    
    positionDropdown.addEventListener("change", function() {
       const selectedElection = election[typeDropdown.value];
       const selectedCandidates = selectedElection ? selectedElection[this.value] : null;
 
       if (selectedCandidates && selectedCandidates.length > 0) {
          resultsTbody.innerHTML = "";
 
          //  highest vote percentage
          const highestVotePercentageCandidate = selectedCandidates.reduce((max, candidate) => {
             return (candidate.votes > max.votes) ? candidate : max;
          });
 
          selectedCandidates.forEach((candidate, index) => {
             const votePercentage = candidate.votes > 0 ? candidate.votes : 0; 
             const barWidth = votePercentage + '%'; 
             const isElected = (candidate === highestVotePercentageCandidate);
 
             // blank
             const electedStatus = (votePercentage > 0) ? (isElected ? "Yes" : "No") : "";
             const barColor = (votePercentage > 0) ? (isElected ? '#4caf50' : 'red') : 'transparent';
 
             // blank
             const barStyle = (votePercentage > 0) ? `width: ${barWidth}; background-color: ${barColor}; height: 100%;` : "display: none;";
 
             
             const displayedVotePercentage = (votePercentage > 0) ? votePercentage : 0;
             const displayedTotalVotes = (votePercentage > 0) ? candidate.votes : 0;
 
             const row = document.createElement("tr");
             row.innerHTML = `
             <td>${index + 1}</td>
             <td>
                <img src="${candidate.photo || 'default.jpg'}" 
                     alt="Photo" 
                     style="width: 20px; height: 20px; border-radius: 50%; margin-right: 10px;">
                ${candidate.name || 'N/A'}
             </td>
             <td>${candidate.gender || 'N/A'}</td>
             <td>${candidate.party || 'N/A'}</td>
             <td class="${isElected ? 'elected-yes' : 'elected-no'}">${electedStatus}</td>
             <td>
                   <div class="vote-bar-container" style="position: relative; height: 10px; ;">
                      <span style="display: ${votePercentage > 0 ? 'inline' : 'none'};">${displayedVotePercentage}%</span>
                      <div class="vote-bar" style="${barStyle}"></div>
                   </div>
             </td>
             <td>${displayedTotalVotes}</td>
          `;
             resultsTbody.appendChild(row);
          });
 
       } else {
          resultsTbody.innerHTML = `
          <tr>
             <td colspan="7">No candidates available.</td>
          </tr>
        `;
       }
    });
 });
 
 
 const storedElectionData = JSON.parse(localStorage.getItem("election"));
 
 if (storedElectionData) {
    console.log(storedElectionData);
 } else {
    console.error("No election data found in localStorage.");
 }
 
