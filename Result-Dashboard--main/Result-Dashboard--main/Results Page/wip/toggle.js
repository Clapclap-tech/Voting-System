document.addEventListener("DOMContentLoaded", function() {
  // Event listener for opening modals
  var candidateRows = document.querySelectorAll('.results-table tbody tr');
  var modals = document.querySelectorAll('.vote-breakdown-modal');
  var closeButtons = document.querySelectorAll('.close');

  candidateRows.forEach(function(row, index) {
    row.addEventListener('click', function() {
      var modal = modals[index];
      modal.style.display = 'block';
    });
  });

  closeButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      button.closest('.vote-breakdown-modal').style.display = 'none';
    });
  });

  // Close modal when clicking outside of it
  window.addEventListener('click', function(event) {
    if (event.target.classList.contains('vote-breakdown-modal')) {
      event.target.style.display = 'none';
    }
  });
});