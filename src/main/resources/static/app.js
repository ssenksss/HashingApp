async function hashText() {
    let inputText = document.getElementById("inputText").value.trim();

    if (inputText === "") {
        alert("Molimo unesite tekst!");
        return;
    }

    try {

        let sha2Result = await fetch("/api/hash/sha2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputText),
        }).then(response => response.json());

        document.getElementById("sha2Result").querySelector("p").innerText = sha2Result.hashValue;
        document.getElementById("sha2Duration").innerText = "Vreme: " + sha2Result.duration + " ms";

        let sha3Result = await fetch("/api/hash/sha3", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputText),
        }).then(response => response.json());

        document.getElementById("sha3Result").querySelector("p").innerText = sha3Result.hashValue;
        document.getElementById("sha3Duration").innerText = "Vreme: " + sha3Result.duration + " ms";

    } catch (error) {
        alert("Greška u generisanju hash-a");
    }
}

function loadContent(tab) {

    document.getElementById("analysisContent").classList.add("hidden");
    document.getElementById("securityContent").classList.add("hidden");
    document.getElementById("differenceContent").classList.add("hidden");


    document.getElementById('speedChart').style.display = 'none';


    if (tab === "analiza") {
        document.getElementById("analysisContent").classList.remove("hidden");
        document.getElementById('speedChart').style.display = 'block'; // Prikazujemo grafikon u analizi
    } else if (tab === "sigurnost") {
        document.getElementById("securityContent").classList.remove("hidden");

    } else if (tab === "razlike") {
        document.getElementById("differenceContent").classList.remove("hidden");

    }

    if (tab === "analiza") {
        createChart();
    }
}




// Funkcija za kreiranje grafikona
function createChart() {
    let sha2Duration = parseInt(document.getElementById("sha2Duration").innerText.split(" ")[1]);
    let sha3Duration = parseInt(document.getElementById("sha3Duration").innerText.split(" ")[1]);

    let ctx = document.getElementById('speedChart').getContext('2d');
    let speedChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['SHA-2', 'SHA-3'],
            datasets: [{
                label: 'Vreme generisanja (ms)',
                data: [sha2Duration, sha3Duration],
                backgroundColor: ['#6c5ce7', '#00b894'],
                borderColor: ['#6c5ce7', '#00b894'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}