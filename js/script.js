/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/


// Select the first element with the class 'link-list'.
const linklist = document.getElementsByClassName('link-list')[0];

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

// showPage function displays a page of nine students
function showPage(list, page) {
   const itemsPerPage = 9;  // Number of students per page
   const startIndex = (page * itemsPerPage) - itemsPerPage; // Calculate start index
   const endIndex = page * itemsPerPage; // Calculate end index
   const studentListUl = document.querySelector('.student-list'); // Select student list
   studentListUl.innerHTML = ''; // Clear previous student entries

   console.log(list); 

   // Loop through the list of students
   for (let i = 0; i < list.length; i++) {
       if (i >= startIndex && i < endIndex) { 
           const studentInfo = `
               <li class="student-item cf">
                   <div class="student-details">
                       <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                       <h3>${list[i].name.first} ${list[i].name.last}</h3>  
                       <span class="email">${list[i].email}</span>
                   </div>
                   <div class="joined-details">
                       <span class="date">Joined ${list[i].registered.date}</span>
                   </div>
               </li>`;
           // Insert student details into the student list
           studentListUl.insertAdjacentHTML('beforeend', studentInfo);
       }
   }
}

// Listen for when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
   showPage(data, 1); // Display the first page of students
});

// Create the add Pagination function to handle pagination 
function createbutton(list){
   let pageNumber = Math.ceil(list.length / 9); // Calculate the number of pages needed
   linklist.innerHTML = ''; // Clear existing pagination buttons
   for(let i = 1; i <= pageNumber; i++) {
      linklist.insertAdjacentHTML('beforeend', `<li><button type="button">${i}</button></li>`);
      console.log('create button'); 
   }

   const firstButton = document.querySelector('button');
   firstButton.className = "active"; // Set the first button as active
   linklist.addEventListener('click', (e) => {
      if(e.target.tagName === 'BUTTON') {
         const removeButton = document.querySelector('.active');
         removeButton.className = '';
         const addButton = e.target;
         addButton.className = 'active';
         const display = addButton.textContent;
         showPage(list, display); // Display the selected page
      } 
   });
}

// Insert a search bar into the header
function insertSearchBar() {
   const header = document.querySelector('.header');
   const searchBarHTML = `
   <label for="search" class="student-search">
            <span>Search by name</span>
            <input id="search" placeholder="Search by name...">
            <button type="button" class="submit"><img src="img/icn-search.svg" alt="Search icon"></button>
          </label>`;
   header.insertAdjacentHTML("beforeend", searchBarHTML);
}

// Initial call to populate the page with students and pagination
showPage(data,1);
createbutton(data);
insertSearchBar();

// Search functionality
const searchField = document.getElementById('search');
const searchBtn = document.querySelector('.submit');

searchField.addEventListener('keyup', () => {
   let searchText = searchField.value.toUpperCase();
   searchBtn.onclick = () => {
      searchField.value = ''; // Clear search field when search button is clicked
   }

   const filteredList = data.filter(student => { // Filter students based on search text
      return (
         student.name.first.toUpperCase().includes(searchText) ||
         student.name.last.toUpperCase().includes(searchText)
      );
   });
   itemData = filteredList;
   currentPage = 1;
   showPage(itemData, currentPage); // Update the display with filtered data
   createbutton(itemData); // Update pagination based on filtered data
});
