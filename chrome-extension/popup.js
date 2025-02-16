document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("generate-report").addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: () => {
                    const getThumbnailUrl = () => {
                        const metaTags = document.getElementsByTagName('meta');
                        for (let tag of metaTags) {
                            if (tag.getAttribute('property') === 'og:image' || tag.getAttribute('name') === 'twitter:image') {
                                return tag.getAttribute('content');
                            }
                        }
                        return null;
                    };

                    return {
                        content: document.body.innerText,  // Extracts article content
                        title: document.title,  // Extracts article title
                        thumbnail: getThumbnailUrl()  // Extracts thumbnail URL
                    };
                }
            }, (results) => {
                if (!results || !results[0] || !results[0].result) {
                    document.getElementById("result").innerHTML = "<p style='color: red;'>Failed to extract article.</p>";
                    return;
                }

                const { content, title, thumbnail } = results[0].result;
                sendToApi({ content, title, thumbnail });
            });
        });
    });
});
async function sendToApi(content) {
    const apiUrl = "http://localhost:8000/generate-report"; // Your API endpoint
    const resultDiv = document.getElementById("result");

    // Show loading spinner
    resultDiv.innerHTML = `<div class="spinner"></div>`;
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        content["url"] = tab.url;
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(content)
        });

        const data = await response.json();
        data["percentage"] = parseInt(data["percentage"], 10);
        data["thumbnail"] = content.thumbnail;
        data["title"] = content.title;

        // Display results and remove spinner
        const label = data.percentage > 75 ? "Clickbait" :
                      data.percentage >= 25 ? "Mixed" :
                      "Legit";

        const labelColor = data.percentage > 75 ? "red" :
                           data.percentage >= 25 ? "orange" :
                           "green";

        resultDiv.innerHTML = `
            <h2>Analysis Report</h2>
            <p><strong>Clickbait Score:</strong> ${data.percentage}%</p>
            <p><strong>Label:</strong> <span style="color: ${labelColor}; font-weight: bold;">${label}</span></p>
            <p><strong>Explanation:</strong> ${data.explanation}</p>
            <p><strong>TLDR:</strong> ${data.tldr}</p>
            ${data["existing"] ? '<button id="view-report">View Existing Report</button>' : '<button id="publish-report">Publish Report</button>'}
        `;

        if (data["existing"]) {
            document.getElementById("view-report").addEventListener("click", () => {
                window.open("http://localhost:8000/view-report", "_blank");
            });
        } else {
            document.getElementById("publish-report").addEventListener("click", async () => {
                try {
                    const publishResponse = await fetch("http://localhost:8000/add-report", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data)
                    });

                    if (publishResponse.ok) {
                        alert("Report published successfully!");
                        const publishButton = document.getElementById("publish-report");
                        publishButton.id = "view-report";
                        publishButton.textContent = "View Report";
                        publishButton.addEventListener("click", () => {
                            window.open("http://localhost:8000/view-report", "_blank");
                        });
                    } else {
                        alert("Failed to publish report.");
                    }
                } catch (error) {
                    alert("Error publishing report.");
                    console.error("Error:", error);
                }
            });
        }
    } catch (error) {
        resultDiv.innerHTML = "<p style='color: red;'>Error analyzing article.</p>";
        console.error("Error:", error);
    }
}
