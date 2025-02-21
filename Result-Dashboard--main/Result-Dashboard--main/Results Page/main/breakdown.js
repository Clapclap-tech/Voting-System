//live traxking*

async function checkElectionStatus() {
  try {
    const response = await fetch('/api/election-status');
    const { status } = await response.json();
    document.getElementById('status').textContent = status;
  } catch (error) {
    console.error('Error checking election status:', error);
  }
}

document.addEventListener('DOMContentLoaded', checkElectionStatus);