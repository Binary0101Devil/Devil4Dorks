async function fetchDorks() {
    const response = await fetch('dorks.json');
    return response.json();
}

function toggleCategory(id) {
    var list = document.getElementById(id);
    list.style.display = list.style.display === "none" ? "block" : "none";
}

async function updateLinks() {
    var domain = document.getElementById("domainInput").value;
    if (!domain) return;
    
    const categories = await fetchDorks();
    var dorkLinks = document.getElementById("dorkLinks");
    dorkLinks.innerHTML = "";
    
    for (let category in categories) {
        let categoryDiv = document.createElement("div");
        categoryDiv.className = "category";
        
        let button = document.createElement("button");
        button.textContent = category;
        button.onclick = function() { toggleCategory(category + "List"); };
        
        let dorkList = document.createElement("div");
        dorkList.id = category + "List";
        dorkList.className = "dork-list";
        
        categories[category].forEach(dork => {
            let div = document.createElement("div");
            div.className = "dork";
            
            let a = document.createElement("a");
            a.href = "https://www.google.com/search?q=" + encodeURIComponent(dork.replace("${domain}", domain));
            a.target = "_blank";
            a.textContent = dork.replace("${domain}", domain);
            
            div.appendChild(a);
            dorkList.appendChild(div);
        });
        
        categoryDiv.appendChild(button);
        categoryDiv.appendChild(dorkList);
        dorkLinks.appendChild(categoryDiv);
    }
}
