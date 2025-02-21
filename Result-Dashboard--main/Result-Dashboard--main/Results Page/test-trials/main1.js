document.addEventListener("DOMContentLoaded", function() {
  // PR*
  var ctxTurnout = document.getElementById('turnoutChart').getContext('2d');
  var turnoutChart = new Chart(ctxTurnout, {
    type: 'doughnut',
    data: {
      labels: ['Participated', 'Did Not Participate'],
      datasets: [{
        data: [60, 40],
        backgroundColor: ['#4caf50', '#f44336'],
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      aspectRatio: 3.1,
      layout: {
        padding: 0
      },
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 15,
            font: {
              size: 17
            }
          },
          padding: 20
        },
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return tooltipItem.label + ': ' + tooltipItem.raw + '%';
            }
          }
        },
        datalabels: {
          display: true,
          color: '#fff',
          font: {
            size: 24,
            weight: 'bold'
          },
          formatter: function(value, context) {
            const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
            const percentage = ((value / total) * 100).toFixed(2) + '%';
            return percentage;
          }
        }
      }
    }
  });

  // Ballots*
  const ballotsCtx = document.getElementById('ballotsChart').getContext('2d');
  const ballotsChart = new Chart(ballotsCtx, {
    type: 'doughnut',
    data: {
      labels: ['Allocated Votes', 'Unregistered Votes'],
      datasets: [{
        data: [96.8, 3.2],
        backgroundColor: ['#2196F3', '#8F00FF']
      }]
    },
    options: {
      responsive: true,
      aspectRatio: 3.1,
      layout: {
        padding: 0
      },
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 15,
            font: {
              size: 17
            }
          },
          padding: 15
        },
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return tooltipItem.label + ': ' + tooltipItem.raw + '%';
            }
          }
        },
        datalabels: {
          display: true,
          color: '#fff',
          font: {
            size: 24,
            weight: 'bold'
          },
          formatter: function(value, context) {
            const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
            const percentage = ((value / total) * 100).toFixed(2) + '%';
            return percentage;
          }
        }
      }
    }
  });

  // refresh results*
  function refreshResults() {
    fetch('/path/to/your/api/endpoint')
      .then(response => response.json())
      .then(data => {
        updateResults(data);
        analyzeVotes(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  // update  results *
  function updateResults(data) {
    var tbody = document.querySelector('.results-table tbody');
    tbody.innerHTML = '';

    data.candidates.forEach(candidate => {
      var row = document.createElement('tr');
      row.innerHTML = `
        <td>${candidate.name}</td>
        <td>${candidate.gender}</td>
        <td>${candidate.party}</td>
        <td class="${candidate.elected === 'Yes' ? 'elected-yes' : 'elected-no'}">${candidate.elected}</td>
        <td>
          <div class="vote-bar-container">
            ${candidate.votePercentage}
            <div class="vote-bar" style="width: ${candidate.votePercentage};"></div>
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


    const sortedCandidates = candidates.sort((a, b) => b.totalVotes - a.totalVotes);

    if (sortedCandidates.length >= 2) {
      const leader = sortedCandidates[0];
      const runnerUp = sortedCandidates[1];
      const margin = leader.totalVotes - runnerUp.totalVotes;
      const marginPercentage = ((margin / leader.totalVotes) * 100).toFixed(2);

      // Display*
      document.querySelector('#marginResult').innerHTML = `
        <p><strong>Vote Margin:</strong> ${margin} votes</p>
        <p><strong>Margin Percentage:</strong> ${marginPercentage}%</p>
        <p><strong>Leading Candidate:</strong> ${leader.name} (${leader.party})</p>
        <p><strong>Runner-Up:</strong> ${runnerUp.name} (${runnerUp.party})</p>
      `;
    }
  }


  setInterval(refreshResults, 10000);
});



// dropdown options fetching*
async function populateFilters() {
  try {
    const response = await fetch('/api/filters');
    const data = await response.json();

    const typeSelect = document.querySelector('select[name="type"]');
    const yearSelect = document.querySelector('select[name="year"]');

    data.types.forEach(type => {
      const option = document.createElement('option');
      option.textContent = type;
      typeSelect.appendChild(option);
    });

    data.years.forEach(year => {
      const option = document.createElement('option');
      option.textContent = year;
      yearSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error populating filters:', error);
  }
}

document.addEventListener('DOMContentLoaded', populateFilters);
