async function hashText() {
    let inputText = document.getElementById("inputText").value.trim();

    if (inputText === "") {
        alert("Molimo unesite tekst!");
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
        console.error("Greška prilikom hashiranja:", error);
        alert("Došlo je do greške. Pokušajte ponovo.");
    }
}

function loadContent(section) {
    let content = {
        'analiza': '<h2>Analiza Hash Funkcija</h2><p>SHA-2 je stariji algoritam koji pruža dobar balans između brzine i sigurnosti, dok je SHA-3 dizajniran da bude otporniji na napade, koristeći drugačiji pristup u dizajnu.</p>',
        'sigurnost': '<h2>Sigurnosna analiza</h2><p>SHA-3 je otporniji na napade poput napada sa sudarima, dok SHA-2 može biti podložan napadima u budućnosti, s obzirom na brzinu napredovanja u računarstvu.</p>',
        'razlike': '<h2>Razlike SHA-2 i SHA-3</h2><p>SHA-2 koristi Merkle–Damgård konstrukciju, dok SHA-3 koristi Sponge konstrukciju koja je otpornija na napade.</p>'
    };

    document.getElementById("dynamicContent").innerHTML = content[section] || '<p>Izaberite opciju</p>';
}
