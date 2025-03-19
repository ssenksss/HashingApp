async function hashText() {

    let inputText = document.getElementById("inputText").value.trim();


    if (inputText === "") {
        alert("Niste uneli tekst!");
        return;
    }

    try {

        let sha2Result = await fetch('/api/hash/sha2', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: inputText
        }).then(res => res.text());

        // Прављење захтева за SHA-3 хеш
        let sha3Result = await fetch('/api/hash/sha3', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: inputText
        }).then(res => res.text());


        document.getElementById("sha2Result").innerText = "SHA-2 Hash: " + sha2Result;
        document.getElementById("sha3Result").innerText = "SHA-3 Hash: " + sha3Result;

    } catch (error) {
        console.error("Error occurred while hashing:", error);
        alert("Greška, pokušajte ponovo!");
    }
}
