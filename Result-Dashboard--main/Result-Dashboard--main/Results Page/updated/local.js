const electionData = {
  "SSG Council Election": {
    "startDate": "2024-12-05",
    "endDate": "2024-12-16",
    "candidates": [
      {
        "name": "Kenjie",
        "position": "President",
        "image": "Images/coe.jpg",
        "gender": "Male",
        "partylist": "Com E",
        "votes": 4,
        "description": "No description",
        "section": "BSCPE 3 Day",
        "elected": false
      },
      {
        "name": "Bryan",
        "position": "President",
        "image": "Images/SSG.png",
        "gender": "Male",
        "partylist": "Com E",
        "votes": 3,
        "description": "No description",
        "section": "BSCPE 3 Day",
        "elected": false
      },
      {
        "name": "Khitsly",
        "position": "Vice President",
        "image": "Images/ICPEP.png",
        "gender": "Male",
        "partylist": "Hacker",
        "votes": 3,
        "description": "No description",
        "section": "BSCPE 3 Day",
        "elected": false
      },
      {
        "name": "Harold",
        "position": "Vice President",
        "image": "Images/ES.png",
        "gender": "Male",
        "partylist": "Hacker",
        "votes": 2,
        "description": "No description",
        "section": "BSCPE 3 Day",
        "elected": false
      }
    ],
    "logo": "Images/SSG.png"
  },
  "Engineering Society Election": {
    "startDate": "2024-12-05",
    "endDate": "2024-12-20",
    "candidates": [],
    "logo": "Images/ES.png"
  },
  "ICPEP Election": {
    "startDate": "2025-01-02",
    "endDate": "2025-01-11",
    "candidates": [],
    "logo": "Images/ICPEP.png"
  },
  "bscpe2": {
    "startDate": "2024-12-26",
    "endDate": "2025-01-18",
    "candidates": [],
    "logo": "Images/ICPEP.png"
  },
  "bulldogan": {
    "startDate": "2025-01-16",
    "endDate": "2025-01-25",
    "candidates": [],
    "logo": "Images/ES.png"
  },
  "test": {
    "startDate": "2025-02-21",
    "endDate": "2025-02-28",
    "candidates": [
      {
        "name": "Asdasd",
        "position": "President",
        "image": "Images/image_2025-02-22_125620362.png",
        "gender": "Male",
        "partylist": "Asdsad",
        "votes": 0,
        "description": "Asdasdsad",
        "section": "Asdasd",
        "elected": false
      }
    ],
    "logo": "Images/image_2025-02-22_125304885.png"
  }
};

// Store electionData in local storage
localStorage.setItem("election", JSON.stringify(electionData));
