const sortBtns=document.querySelectorAll(".job-id > *")
const sortItems=document.querySelectorAll(".jobs-container > *")


sortBtns.forEach((btn)=>{
    btn.addEventListener('click',()=>{
        sortBtns.forEach((btn) => btn.classList.remove("active"));
        btn.classList.add("active");


        const targetData= btn.getAttribute("data-target");

        sortItems.forEach((item) => {
            item.classList.add("delete");
            if(item.getAttribute("data-item") === targetData || targetData==="all"){
                item.classList.remove("delete");
            }
        });
    });
});



// function filterJobs() {
//     const titleInput = document.getElementById('searchTitle').value.toLowerCase();
//     const locationInput = document.getElementById('searchLocation').value.toLowerCase();
//     const typeInput = document.getElementById('searchType').value;
  
//     const jobs = document.querySelectorAll('.jList');
  
//     jobs.forEach(job => {
//       const jobText = job.querySelector('h3').innerText.toLowerCase();
//       const locationText = job.querySelector('span#key').innerText.toLowerCase();
  
//       const matchTitle = jobText.includes(titleInput);
//       const matchLocation = locationText.includes(locationInput);
//       const matchType = typeInput === '' || locationText.includes(typeInput.toLowerCase());
  
//       if (matchTitle && matchLocation && matchType) {
//         job.style.display = "grid";
//       } else {
//         job.style.display = "none";
//       }
//     });
//   }
  

//   const jobData = [
//     { title: "Frontend Developer", location: "Remote • Full Time" },
//     { title: "Marketing Analyst", location: "Delhi • Full Time" },
//     { title: "UX Designer", location: "Remote • Freelancer" },
//     { title: "Data Entry", location: "Work From Home • Part Time" },
//     { title: "Customer Support", location: "Mumbai • Full Time" }
//   ];
  
//   function filterJobs() {
//     const titleInput = document.getElementById('searchTitle').value.toLowerCase();
//     const locationInput = document.getElementById('searchLocation').value.toLowerCase();
//     const typeInput = document.getElementById('searchType').value;
  
//     const jobsContainer = document.querySelector('.jobs-container');
//     jobsContainer.innerHTML = '';
  
//     let matches = jobData.filter(job => {
//       const jobTitle = job.title.toLowerCase();
//       const jobLocation = job.location.toLowerCase();
//       const matchTitle = jobTitle.includes(titleInput);
//       const matchLocation = jobLocation.includes(locationInput);
//       const matchType = typeInput === '' || jobLocation.includes(typeInput.toLowerCase());
//       return matchTitle && matchLocation && matchType;
//     });
  
//     if (matches.length === 0) {
//       jobsContainer.innerHTML = "<p>No jobs found for your search.</p>";
//       return;
//     }
  
//     matches.forEach(job => {
//       jobsContainer.innerHTML += `
//         <li class="jList">
//           <h3>${job.title}</h3>
//           <p>${job.location}</p>
//         </li>`;
//     });
//   }
  
//   window.onload = filterJobs; // Load all jobs when page opens.
// Job data (static fake database)
const jobData = [
    {
      title: "Frontend Developer",
      location: "Remote",
      type: "Full Time",
      company: "Google",
      logo: "images/google.png",
      salary: "$1200 - $1500"
    },
    {
      title: "Marketing Analyst",
      location: "Delhi",
      type: "Part Time",
      company: "Uber",
      logo: "images/uber.png",
      salary: "$800 - $1000"
    },
    {
      title: "UX Designer",
      location: "Remote",
      type: "Freelancer",
      company: "Yahoo",
      logo: "images/yahoo.png",
      salary: "$700 - $1100"
    },
    {
      title: "Customer Support",
      location: "Mumbai",
      type: "Full Time",
      company: "Meta",
      logo: "images/facebook.png",
      salary: "$900 - $1100"
    }
  ];
  
  // Renders job cards
  function renderJobs(jobs) {
    const jobsContainer = document.querySelector(".jobs-container");
    jobsContainer.innerHTML = ""; // clear previous
  
    if (jobs.length === 0) {
      jobsContainer.innerHTML = "<p>No jobs found for your search.</p>";
      return;
    }
  
    jobs.forEach(job => {
      jobsContainer.innerHTML += `
        <li class="jList">
          <img src="${job.logo}" alt="${job.company}">
          <h3>${job.title}</h3>
          <p>${job.salary}</p>
          <span id="key">${job.type} • ${job.location}</span>
        </li>`;
    });
  }
  
  // Filters jobData based on inputs
  function filterJobs() {
    const titleInput = document.getElementById('searchTitle').value.toLowerCase();
    const locationInput = document.getElementById('searchLocation').value.toLowerCase();
    const typeInput = document.getElementById('searchType').value;
  
    const filtered = jobData.filter(job => {
      const titleMatch = job.title.toLowerCase().includes(titleInput);
      const locationMatch = job.location.toLowerCase().includes(locationInput);
      const typeMatch = typeInput === "" || job.type.toLowerCase() === typeInput.toLowerCase();
      return titleMatch && locationMatch && typeMatch;
    });
  
    renderJobs(filtered);
  }
  
  // Load all jobs on page load
  window.onload = () => {
    renderJobs(jobData);
  };
  

  document.addEventListener("DOMContentLoaded", function () {
    const roles = [
      "🌈 Equity in Employment",
      "🚀 Empowering Every Voice",
      "🤝 Jobs with Purpose",
      "🌱 Opportunity for All"
    ];
  
    const typingEl = document.getElementById("typing");
    if (!typingEl) return; // exit if typing element doesn't exist
  
    let roleIndex = 0;
    let charIndex = 0;
    let typingForward = true;
  
    function typeEffect() {
      if (typingForward) {
        charIndex++;
        if (charIndex > roles[roleIndex].length) {
          typingForward = false;
          setTimeout(typeEffect, 1000);
          return;
        }
      } else {
        charIndex--;
        if (charIndex === 0) {
          typingForward = true;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
  
      typingEl.innerText = roles[roleIndex].substring(0, charIndex);
      setTimeout(typeEffect, typingForward ? 100 : 50);
    }
  
    typeEffect();
  });

  
  