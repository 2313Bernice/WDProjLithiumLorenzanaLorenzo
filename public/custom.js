
if (!localStorage.getItem("loggedIn") || localStorage.getItem("loggedIn") !== "true") {    //Checks if the user is logged in by checking if loggedIn is true
    alert("Account not logged in. Please log in first.");  //If not logged in, the user is alerted to log in first
    window.location.href = "LogIn.html"; //Redirects the user to the login page
}

function logOut(event) {           //Allows the user to log off.
    event.preventDefault();
    localStorage.setItem("loggedIn", "false");  //sets loggedIn to false when user logs out without deleting data from localStorage (keeps account info)
    window.location.href = "LogIn.html"; //Redirects the user to the login page
}
const savedProfilePic = localStorage.getItem("profilePic");

//Displays user information by retrieving data from localStorage and inserting it into its designated HTML element
document.getElementById("profilePic").src =  savedProfilePic ||"images/profile.png";          
document.getElementById("displayName").textContent = localStorage.getItem("disname");
document.getElementById("age").textContent = localStorage.getItem("age");
document.getElementById("caption").textContent = localStorage.getItem("caption");
document.getElementById("username").textContent = localStorage.getItem("username");
document.getElementById("password").textContent = localStorage.getItem("password");
document.getElementById("fullname").textContent = localStorage.getItem("fname") + " " + localStorage.getItem("lname");
document.getElementById("email").textContent = localStorage.getItem("email");
document.getElementById("num").textContent = localStorage.getItem("num");
document.getElementById("location").textContent = localStorage.getItem("location");

function currentData() {    //gets the current profile data from localStorage and returns it as an object for use in saving to history or applying from history
    return {
        profilePic: localStorage.getItem("profilePic"),
        disname: localStorage.getItem("disname"),
        age: localStorage.getItem("age"),
        caption: localStorage.getItem("caption"),
        username: localStorage.getItem("username"),
        password: localStorage.getItem("password"),
        fname: localStorage.getItem("fname"),
        lname: localStorage.getItem("lname"),
        email: localStorage.getItem("email"),
        num: localStorage.getItem("num"),
        location: localStorage.getItem("location")
    };
}

function loadList() {    //loads the profile history from localStorage, returning an array of history entries or an empty array if no history exists

    const historyJSON = localStorage.getItem("profileHistory");

    if(!historyJSON) {
        return [];
    }

    return JSON.parse(historyJSON);
}

function saveList(history) {   //saves the given profile history array to localStorage as a JSON string
    localStorage.setItem("profileHistory", JSON.stringify(history));
}

function saveCurrent() {     //saves the current profile data as a new entry in the profile history, prompting the user for a name for the entry and then updating the history list display
    const history = loadList();
    const entryNumber = history.length + 1;

    const entryName = prompt(
        "Enter a name for this entry (e.g., Preset 1 " + entryNumber + "):",
        "Preset 1 " + entryNumber
    );

    if (!entryName || entryName.trim() === "") {
         return;
    }
       
    const profileData = currentData();

    const newEntry = {
        id: Date.now(),
        name: entryName,
        timestamp: new Date().toLocaleString(),
        data: profileData
    };

    history.push(newEntry);
    saveList(history);
    showList();

    alert("Profile saved to history as '" + entryName + "'!");
}

//Renders the profile history list in the history modal, displaying each entry with options to view, apply, or delete an entry.
//If no history entries exist, it shows a default message prompting the user to create a new entry.
function showList() {
    const history = loadList();
    const historyList = document.getElementById("historyList");

    if (history.length === 0) {
        historyList.innerHTML = "<p class='empty-message'>No current profile history. Add a new entry!</p>";
        return;
    }

    let content = "";

    for (let i = 0; i < history.length; i++) {
        const entry = history[i];

        content += `
        <div class="history-item">
            <div class="history-item-info">
                <h4>${entry.name}</h4>
                <p class="history-item-date">Saved: ${entry.timestamp}</p>
            </div>

            <div class="history-item-actions">
                <button class="view-history-btn" onclick="viewEntry(${entry.id})">View</button>
                <button class="apply-history-btn" onclick="applyEntry(${entry.id})">Apply</button>
                <button class="delete-history-btn" onclick="deleteEntry(${entry.id})">Delete</button>
            </div>
        </div> 
        `;
    }

    historyList.innerHTML = content;
}

//Displays the details of a specific history entry in the preview tab of the history modal
//This allows users to see a preview of the profile data saved for that specific history entry
function viewEntry(entryId) {
    const history = loadList();
    let entry = "";

    for (let i = 0; i < history.length; i++) {
        if (history[i].id === entryId) {
            entry = history[i];
            break;
        }
    }

    if (!entry) {
        alert("History entry not found!");
        return;
    }

    window.currentHistoryEntry = entry;

    const data = entry.data;
    document.getElementById("previewPic").src = data.profilePic || "images/profile.png";
    document.getElementById("previewName").textContent = data.disname || "N/A";
    document.getElementById("previewAge").textContent = data.age || "N/A";
    document.getElementById("previewCaption").textContent = data.caption || "N/A";
    document.getElementById("previewUsername").textContent = data.username || "N/A";
    document.getElementById("previewEmail").textContent = data.email || "N/A";
    document.getElementById("previewNum").textContent = data.num || "N/A";
    document.getElementById("previewLocation").textContent = data.location || "N/A";

    switchTab("preview");
}

function applyEntry(entryId) {  //applies the profile data from a specific history entry to the current profile
    const history = loadList();
    let entry = null;

    for (let i = 0; i < history.length; i++) {
        if (history[i].id === entryId) {
            entry = history[i];
            break;
        }
    }

    if (!entry) {
        alert("History entry not found!");
        return;
    }

    applyProfile(entry.data);

    alert("Profile updated with '" + entry.name + "'!");
    closeModal();
    location.reload();
}

function applyPreview() {    //applies the profile data from the currently previewed history entry to the current profile
    if (!window.currentHistoryEntry) {
        alert("No history entry selected!");
        return;
    }

    applyProfile(window.currentHistoryEntry.data);

    alert("Profile updated with '" + window.currentHistoryEntry.name + "'!");
    closeModal();
    location.reload();
}

function applyProfile(profileData) {   //applies the given profile data to the current profile by updating localStorage and refreshing the displayed profile information on the page

    const fields = ["profilePic", "disname", "age", "caption", "username", 
        "password", "fname", "lname", "email", "num", "location"];

    for(let i = 0; i < fields.length; i++) {
        const field = fields[i];

        if (profileData[field]) {
            localStorage.setItem(field, profileData[field]);
        }
    }
   
    document.getElementById("profilePic").src = profileData.profilePic ||"images/profile.png";
    document.getElementById("displayName").textContent = profileData.disname;
    document.getElementById("age").textContent = profileData.age;
    document.getElementById("caption").textContent = profileData.caption;
    document.getElementById("username").textContent = profileData.username;
    document.getElementById("password").textContent = profileData.password;
    document.getElementById("fullname").textContent = profileData.fname + " " + profileData.lname;
    document.getElementById("email").textContent = profileData.email;
    document.getElementById("num").textContent = profileData.num;
    document.getElementById("location").textContent = profileData.location;
}

function deleteEntry(entryId) {     //deletes a specific history entry from the profile history after confirming with the user, then updates the history list display
    const history = loadList();
    let entryIndex = -1;

    for (let i = 0; i < history.length; i++) {
        if (history[i].id === entryId) {
            entryIndex = i;
            break;
        }
    }

    if (entryIndex === -1) {
        alert("History entry not found!");
        return;
    }

    const entryName = history[entryIndex].name;

    if (confirm("Delete '" + entryName + "'?")) {
        history.splice(entryIndex, 1);
        saveList(history);
        showList();
        alert("History entry deleted!");
    }
}

function openModal() {   //opens the history modal and renders the profile history list for the user to view, apply, or delete history entries
    document.getElementById("historyModal").classList.add("active");
    showList();
}

function closeModal() {    //closes the history modal and resets it to the default list view
    document.getElementById("historyModal").classList.remove("active");
    switchHistoryTab("list");
}


function switchTab(tab) {      //switches between the list view and preview view tabs in the history modal, showing the appropriate content based on the selected tab

    if (tab === "list") {
        document.getElementById("historyListView").classList.add("active");
        document.getElementById("historyPreviewView").classList.remove("active");
    } 
    
    else {
        document.getElementById("historyListView").classList.remove("active");
        document.getElementById("historyPreviewView").classList.add("active");
    }
}

window.addEventListener("click", function (event) {     //closes the history modal if the user clicks outside of the modal content area, providing a convenient way to exit the modal without needing to click a close button
    const modal = document.getElementById("historyModal");

    if (event.target === modal) {
        closeModal();
    }
});