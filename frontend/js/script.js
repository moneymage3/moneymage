console.log("JS Loaded ✅");
document.getElementById("feedback-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("input-name").value;
    const email = document.getElementById("input-email").value;
    const topic = document.getElementById("input-topic").value;
    const message = document.getElementById("input-message").value;

    try {
        const res = await fetch("https://moneymage.onrender.com", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, topic, message })
        });

        const data = await res.json();
        alert(data.message);
    } catch (error) {
        alert("Error sending feedback ❌");
        console.log(error);
    }
});
