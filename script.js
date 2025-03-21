const API_KEY = "YOUR_GOOGLE_API_KEY"; // Replace with your Google API key
const CX = "YOUR_CUSTOM_SEARCH_ENGINE_ID"; // Replace with your Custom Search Engine ID

async function getSearchResults(query, resultElement) {
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${API_KEY}&cx=${CX}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.items) {
            const firstResult = data.items[0]; // Get the first result
            resultElement.textContent = `Top Result: ${firstResult.title}`;
            resultElement.innerHTML = `<a href="${firstResult.link}" target="_blank">${firstResult.title}</a>`;
        } else {
            resultElement.textContent = "No results found";
        }
    } catch (error) {
        resultElement.textContent = "Error fetching results";
        console.error(error);
    }
}

function updateLinks() {
    var domain = document.getElementById("domainInput").value;
    if (!domain) return;

    fetch("dorks.json")
        .then(response => response.json())
        .then(data => {
            const dorkLinks = document.getElementById("dorkLinks");
            dorkLinks.innerHTML = "";

            for (const [category, dorks] of Object.entries(data)) {
                let categoryDiv = document.createElement("div");
                categoryDiv.className = "category";
                categoryDiv.innerHTML = `<h3>${category}</h3>`;

                let dorkList = document.createElement("div");
                dorkList.className = "dork-list";

                dorks.forEach(dork => {
                    let dorkQuery = dork.replace(/\${domain}/g, domain);
                    let div = document.createElement("div");
                    div.className = "dork";

                    let link = document.createElement("a");
                    link.href = `https://www.google.com/search?q=${encodeURIComponent(dorkQuery)}`;
                    link.target = "_blank";
                    link.textContent = dorkQuery;

                    let resultSpan = document.createElement("span");
                    resultSpan.className = "search-result";
                    resultSpan.textContent = "Fetching...";

                    getSearchResults(dorkQuery, resultSpan);

                    div.appendChild(link);
                    div.appendChild(resultSpan);
                    dorkList.appendChild(div);
                });

                categoryDiv.appendChild(dorkList);
                dorkLinks.appendChild(categoryDiv);
            }
        })
        .catch(error => console.error("Error loading dorks:", error));
}
