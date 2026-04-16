
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
document.getElementById("profilePic").src =
    savedProfilePic ? savedProfilePic : "images/profile.png";          
document.getElementById("displayName").textContent = localStorage.getItem("disname");
document.getElementById("age").textContent = localStorage.getItem("age");
document.getElementById("caption").textContent = localStorage.getItem("caption");
document.getElementById("username").textContent = localStorage.getItem("username");
document.getElementById("password").textContent = localStorage.getItem("password");
document.getElementById("fullname").textContent = localStorage.getItem("fname") + " " + localStorage.getItem("lname");
document.getElementById("email").textContent = localStorage.getItem("email");
document.getElementById("num").textContent = localStorage.getItem("num");
document.getElementById("location").textContent = localStorage.getItem("location");

//Gets the current profile data from localStorage and returns it as an object for use in saving to history or applying from history
function getCurrentProfileData() {
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

//Loads the profile history from localStorage, returning an array of history entries or an empty array if no history exists
function loadProfileHistory() {
    const historyJSON = localStorage.getItem("profileHistory");
    return historyJSON ? JSON.parse(historyJSON) : [];
}

//Saves the given profile history array to localStorage as a JSON string
function saveHistoryToStorage(history) {
    localStorage.setItem("profileHistory", JSON.stringify(history));
}

//Saves the current profile data as a new entry in the profile history, prompting the user for a name for the entry and then updating the history list display
function saveCurrentAsHistory() {
    const history = loadProfileHistory();
    const entryNumber = history.length + 1;

    const entryName = prompt(
        "Enter a name for this entry (e.g., Custom Change " + entryNumber + "):",
        "Custom Change " + entryNumber
    );

    if (!entryName || entryName.trim() === "") return;

    const profileData = getCurrentProfileData();

    const newEntry = {
        id: Date.now(),
        name: entryName,
        timestamp: new Date().toLocaleString(),
        data: profileData
    };

    history.push(newEntry);
    saveHistoryToStorage(history);
    renderHistoryList();

    alert("Profile saved to history as '" + entryName + "'!");
}

//Renders the profile history list in the history modal, displaying each entry with options to view, apply, or delete an entry.
//If no history entries exist, it shows a default message prompting the user to create a new entry.
function renderHistoryList() {
    const history = loadProfileHistory();
    const historyList = document.getElementById("historyList");

    if (history.length === 0) {
        historyList.innerHTML =
            "<p class='empty-message'>No current profile history. Add a new entry!</p>";
        return;
    }

    let html = "";

    for (let i = 0; i < history.length; i++) {
        const entry = history[i];

        html += "<div class='history-item'>";
        html += "<div class='history-item-info'>";
        html += "<h4>" + entry.name + "</h4>";
        html += "<p class='history-item-date'>Saved: " + entry.timestamp + "</p>";
        html += "</div>";

        html += "<div class='history-item-actions'>";
        html += "<button class='view-history-btn' onclick='viewHistoryEntry(" + entry.id + ")'>View</button>";
        html += "<button class='apply-history-btn' onclick='applyHistoryEntry(" + entry.id + ")'>Apply</button>";
        html += "<button class='delete-history-btn' onclick='deleteHistoryEntry(" + entry.id + ")'>Delete</button>";
        html += "</div>";

        html += "</div>";
    }

    historyList.innerHTML = html;
}

//Displays the details of a specific history entry in the preview tab of the history modal
//This allows users to see a preview of the profile data saved for that specific history entry
function viewHistoryEntry(entryId) {
    const history = loadProfileHistory();
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

    window.currentHistoryEntry = entry;

    const data = entry.data;

    document.getElementById("previewHistoryPic").src =
        data.profilePic ? data.profilePic : "images/profile.png";

    document.getElementById("previewHistoryName").textContent = data.disname || "N/A";
    document.getElementById("previewHistoryAge").textContent = data.age || "N/A";
    document.getElementById("previewHistoryCaption").textContent = data.caption || "N/A";
    document.getElementById("previewHistoryUsername").textContent = data.username || "N/A";
    document.getElementById("previewHistoryEmail").textContent = data.email || "N/A";
    document.getElementById("previewHistoryNum").textContent = data.num || "N/A";
    document.getElementById("previewHistoryLocation").textContent = data.location || "N/A";

    switchHistoryTab("preview");
}

//Applies the profile data from a specific history entry to the current profile
function applyHistoryEntry(entryId) {
    const history = loadProfileHistory();
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

    applyHistoryToProfile(entry.data);

    alert("Profile updated with '" + entry.name + "'!");
    closeHistoryModal();
    location.reload();
}


//Applies the profile data from the currently previewed history entry to the current profile
function applyPreviewHistory() {
    if (!window.currentHistoryEntry) {
        alert("No history entry selected!");
        return;
    }

    applyHistoryToProfile(window.currentHistoryEntry.data);

    alert("Profile updated with '" + window.currentHistoryEntry.name + "'!");
    closeHistoryModal();
    location.reload();
}


//Applies the given profile data to the current profile by updating localStorage and refreshing the displayed profile information on the page
function applyHistoryToProfile(profileData) {
    if (profileData.profilePic)
        localStorage.setItem("profilePic", profileData.profilePic);

    if (profileData.disname)
        localStorage.setItem("disname", profileData.disname);

    if (profileData.age)
        localStorage.setItem("age", profileData.age);

    if (profileData.caption)
        localStorage.setItem("caption", profileData.caption);

    if (profileData.username)
        localStorage.setItem("username", profileData.username);

    if (profileData.password)
        localStorage.setItem("password", profileData.password);

    if (profileData.fname)
        localStorage.setItem("fname", profileData.fname);

    if (profileData.lname)
        localStorage.setItem("lname", profileData.lname);

    if (profileData.email)
        localStorage.setItem("email", profileData.email);

    if (profileData.num)
        localStorage.setItem("num", profileData.num);

    if (profileData.location)
        localStorage.setItem("location", profileData.location);

    
    document.getElementById("profilePic").src =
        profileData.profilePic ? profileData.profilePic : "images/profile.png";
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

//Deletes a specific history entry from the profile history after confirming with the user, then updates the history list display
function deleteHistoryEntry(entryId) {
    const history = loadProfileHistory();
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
        saveHistoryToStorage(history);
        renderHistoryList();
        alert("History entry deleted!");
    }
}


//Opens the history modal and renders the profile history list for the user to view, apply, or delete history entries
function openHistoryModal() {
    document.getElementById("historyModal").classList.add("active");
    renderHistoryList();
}


//Closes the history modal and resets it to the default list view
function closeHistoryModal() {
    document.getElementById("historyModal").classList.remove("active");
    switchHistoryTab("list");
}

//Switches between the list view and preview view tabs in the history modal, showing the appropriate content based on the selected tab
function switchHistoryTab(tab) {
    if (tab === "list") {
        document.getElementById("historyListView").classList.add("active");
        document.getElementById("historyPreviewView").classList.remove("active");
    } else {
        document.getElementById("historyListView").classList.remove("active");
        document.getElementById("historyPreviewView").classList.add("active");
    }
}

//Closes the history modal if the user clicks outside of the modal content area, providing a convenient way to exit the modal without needing to click a close button
window.addEventListener("click", function (event) {
    const modal = document.getElementById("historyModal");
    if (event.target === modal) {
        closeHistoryModal();
    }
});