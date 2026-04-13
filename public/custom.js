
if (!localStorage.getItem("loggedIn") || localStorage.getItem("loggedIn") !== "true") {    //Checks if the user is logged in by checking if loggedIn is true
    alert("Account not logged in. Please log in first.");  //If not logged in, the user is alerted to log in first
    window.location.href = "LogIn.html"; //Redirects the user to the login page
}

function logOut(event) {           //Allows the user to log off.
    event.preventDefault();
    localStorage.setItem("loggedIn", "false");  //sets loggedIn to false when user logs out without deleting data from localStorage (keeps account info)
    window.location.href = "LogIn.html"; //Redirects the user to the login page
}


//Displays user information by retrieving data from localStorage and inserting it into its designated HTML element
document.getElementById("profilePic").src = localStorage.getItem("profilePic");            
document.getElementById("displayName").textContent = localStorage.getItem("disname");
document.getElementById("age").textContent = localStorage.getItem("age");
document.getElementById("caption").textContent = localStorage.getItem("caption");

document.getElementById("profilePic").src = localStorage.getItem("profilePic");
document.getElementById("username").textContent = localStorage.getItem("username");
document.getElementById("password").textContent = localStorage.getItem("password");
document.getElementById("fullname").textContent = localStorage.getItem("fname") + " " + localStorage.getItem("lname");
document.getElementById("email").textContent = localStorage.getItem("email");
document.getElementById("num").textContent = localStorage.getItem("num");
document.getElementById("location").textContent = localStorage.getItem("location");


const savedProfilePic = localStorage.getItem("profilePic");

if (savedProfilePic) {
    document.getElementById("profilePic").src = savedProfilePic;
} else {
    document.getElementById("profilePic").src = "images/profile.png";
}

document.getElementById("displayName").textContent = localStorage.getItem("disname");
document.getElementById("age").textContent = localStorage.getItem("age");
document.getElementById("caption").textContent = localStorage.getItem("caption");
document.getElementById("username").textContent = localStorage.getItem("username");
document.getElementById("password").textContent = localStorage.getItem("password");
document.getElementById("fullname").textContent = localStorage.getItem("fname") + " " + localStorage.getItem("lname");
document.getElementById("email").textContent = localStorage.getItem("email");
document.getElementById("num").textContent = localStorage.getItem("num");
document.getElementById("location").textContent = localStorage.getItem("location");


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

function loadProfileHistory() {
    const historyJSON = localStorage.getItem("profileHistory");
    return historyJSON ? JSON.parse(historyJSON) : [];
}

function saveHistoryToStorage(history) {
    localStorage.setItem("profileHistory", JSON.stringify(history));
}

function saveCurrentAsHistory() {
    const history = loadProfileHistory();
    const entryNumber = history.length + 1;

    const entryName = prompt(
        "Enter name for this profile history (e.g., Custom Change " + entryNumber + "):",
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

function renderHistoryList() {
    const history = loadProfileHistory();
    const historyList = document.getElementById("historyList");

    if (history.length === 0) {
        historyList.innerHTML =
            "<p class='empty-message'>No profile history yet. Save your current profile to create the first entry!</p>";
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

    if (data.profilePic) {
        localStorage.setItem("profilePic", data.profilePic);
        document.getElementById("profilePic").src = data.profilePic;
    }

    document.getElementById("previewHistoryPic").src =
        data.profilePic || "images/profile.png";

    document.getElementById("previewHistoryName").textContent = data.disname || "N/A";
    document.getElementById("previewHistoryAge").textContent = data.age || "N/A";
    document.getElementById("previewHistoryCaption").textContent = data.caption || "N/A";
    document.getElementById("previewHistoryUsername").textContent = data.username || "N/A";
    document.getElementById("previewHistoryEmail").textContent = data.email || "N/A";
    document.getElementById("previewHistoryNum").textContent = data.num || "N/A";
    document.getElementById("previewHistoryLocation").textContent = data.location || "N/A";

    switchHistoryTab("preview");
}

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

    
    document.getElementById("profilePic").src = profileData.profilePic;
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

function openHistoryModal() {
    document.getElementById("historyModal").classList.add("active");
    renderHistoryList();
}

function closeHistoryModal() {
    document.getElementById("historyModal").classList.remove("active");
    switchHistoryTab("list");
}

function switchHistoryTab(tab) {
    if (tab === "list") {
        document.getElementById("historyListView").classList.add("active");
        document.getElementById("historyPreviewView").classList.remove("active");
    } else {
        document.getElementById("historyListView").classList.remove("active");
        document.getElementById("historyPreviewView").classList.add("active");
    }
}


window.addEventListener("click", function (event) {
    const modal = document.getElementById("historyModal");
    if (event.target === modal) {
        closeHistoryModal();
    }
});