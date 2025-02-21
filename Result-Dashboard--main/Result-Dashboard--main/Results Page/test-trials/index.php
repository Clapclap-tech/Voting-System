<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Election Results Dashboard</title>
  <link rel="stylesheet" href="main1.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <style>
     .dropdown {
      position: relative;
      display: inline-block;

    }

    .dropdown-content {

      display: none;
      position: absolute;
      background-color: #f9f9f9;
      min-width: 85px;
      z-index: 1;

      box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
      padding: 10px;
      border-radius: 5px;
    }

    .dropdown:hover .dropdown-content {
      display: block;
    }

    .dropdown-content button {
      padding: 8px;
      width: 100%;
      background: none;
      border: none;
      color: black;
      text-align: left;
      cursor: pointer;
    }

    .dropdown-content button:hover {
      background-color: #ddd;
    }
  </style>
</head>

<body>
  <?php
  
  $candidates = [
      ["id" => 1, "name" => "Candidate 1", "gender" => "Female", "party" => "PT1", "elected" => "Yes", "votes" => 40, "percentage" => 23.73],
      ["id" => 2, "name" => "Candidate 2", "gender" => "Male", "party" => "PT2", "elected" => "Yes", "votes" => 29, "percentage" => 16.95],
      ["id" => 3, "name" => "Candidate 3", "gender" => "Male", "party" => "PT1", "elected" => "Yes", "votes" => 28, "percentage" => 16.80],
      ["id" => 4, "name" => "Candidate 4", "gender" => "Male", "party" => "PT3", "elected" => "Yes", "votes" => 27, "percentage" => 16.59],
      ["id" => 5, "name" => "Candidate 5", "gender" => "Male", "party" => "PT3", "elected" => "No", "votes" => 21, "percentage" => 12.35],
      ["id" => 6, "name" => "Candidate 6", "gender" => "Male", "party" => "PT1", "elected" => "Yes", "votes" => 20, "percentage" => 11.78],
  ];
  ?>

  
  <header>
    <div>
      <h1>Election Results Dashboard</h1>
    </div>
    <div class="header-buttons">
      <div class="dropdown">
        <button>
          <i class="fas fa-download"></i> Download
        </button>
        <div class="dropdown-content">
          <button onclick="downloadCSV()">Download CSV</button>
          <button onclick="downloadPDF()">Download PDF</button>
        </div>
      </div>
      <button onclick="publish()">
        <i class="fas fa-paper-plane"></i> Publish
      </button>
    </div>
  </header>

  
  <div class="dropdown-header">
    <div class="filters">
      <label>Election:</label>
      <select>
        <option>President</option>
      </select>
      <label>Type:</label>
      <select>
        <option>SSG</option>
      </select>
      <label>Filter By:</label>
      <select>
        <option>Select</option>
      </select>
      <label>Year:</label>
      <select>
        <option>Select</option>
      </select>
      <div class="status-label">Status: <span class="status-completed">Completed</span></div>
    </div>
  </div>

  
  <div class="stats">
    <div class="stat">
      <h2>Participation Rate</h2>
      <canvas id="turnoutChart" width="180" height="180"></canvas>
      <div class="total-voters">
        <p>Total Voters: <span id="totalVoters">Loading...</span></p>
      </div>
    </div>
    <div class="stat">
      <h2>Votes Casted</h2>
      <canvas id="ballotsChart" width="180" height="180"></canvas>
      <div class="total-votes">
        <p>Total Votes: <span id="totalVotes">Loading...</span></p>
      </div>
    </div>
  </div>

  
  <div class="results-table">
    <table id="results-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Party</th>
          <th>Elected</th>
          <th>% of Votes</th>
          <th>Total Votes</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($candidates as $candidate): ?>
          <tr>
            <td><?= $candidate['id'] ?></td>
            <td>
              <img src="images.png" alt="Profile" class="profile-icon" />
              <?= htmlspecialchars($candidate['name']) ?>
            </td>
            <td><?= htmlspecialchars($candidate['gender']) ?></td>
            <td><?= htmlspecialchars($candidate['party']) ?></td>
            <td class="<?= $candidate['elected'] === 'Yes' ? 'elected-yes' : 'elected-no' ?>">
              <?= htmlspecialchars($candidate['elected']) ?>
            </td>
            <td>
              <div class="vote-bar-container">
                <?= htmlspecialchars($candidate['percentage']) ?>%
                <div class="vote-bar" style="width: <?= htmlspecialchars($candidate['percentage']) ?>%;"></div>
              </div>
            </td>
            <td><?= htmlspecialchars($candidate['votes']) ?></td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  </div>

  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js"></script>
  <script src="main1.js"></script>
  <script>
    function downloadCSV() {
      
    }

    function downloadPDF() {
      
    }

    function publish() {
      alert("Publish button clicked!");
    }
  </script>
</body>

</html>