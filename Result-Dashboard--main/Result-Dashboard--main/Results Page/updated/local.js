const electionData = {
   "SSG Council": {
      "President": [
         { "name": "Kenjie", "gender": "Male", "party": "com e", "votes": 0, "photo": "Images/coe.jpg" },
         { "name": "Bryan", "gender": "Male", "party": "com e", "votes": 0, "photo": "Images/SSG.png" }
      ],
      "Vice President": [
         { "name": "Khitsly", "gender": "Male", "party": "hacker", "votes": 0, "photo": "Images/ICPEP.png" },
         { "name": "Harold", "gender": "Male", "party": "hacker", "votes": 0, "photo": "Images/ES.png" }
      ]
   },
   "Engineering Society": {
      "President": [],
      "Vice President": []
   },
   "ICPEP": {
      "President": [],
      "Vice President": []
   },
   "bscpe2": {
      "President": [],
      "Vice President": []
   },
   "Bulldogan": {
      "President": [],
      "Vice President": []
   }
};

// Storing electionData on local
localStorage.setItem("electionData", JSON.stringify(electionData));