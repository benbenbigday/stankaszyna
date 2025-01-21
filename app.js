const apiUrl = "https://stankaszyna.vercel.app/status";

// Funkcja pobierająca dane z serwera
async function fetchStatus() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    // Aktualizacja elementów w DOM
    document.getElementById("date").textContent = data.date || "Brak danych";
    document.getElementById("status").textContent = data.status || "Brak danych";
    document.getElementById("lastUpdated").textContent = data.lastUpdated || "Brak danych";
  } catch (error) {
    console.error("Wystąpił problem z pobieraniem statusu:", error);
    alert("Nie udało się pobrać danych. Sprawdź połączenie z serwerem.");
  }
}

// Funkcja obsługująca przesyłanie nowego stanu
async function updateStatus(event) {
  event.preventDefault();

  const newStatus = document.getElementById("newStatus").value;
  if (!newStatus) {
    alert("Proszę wpisać nowy stan.");
    return;
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    alert("Stan został pomyślnie zaktualizowany!");
    document.getElementById("newStatus").value = ""; // Wyczyść pole formularza
    fetchStatus(); // Odśwież dane na stronie
  } catch (error) {
    console.error("Wystąpił problem z aktualizacją statusu:", error);
    alert("Nie udało się zaktualizować stanu. Spróbuj ponownie później.");
  }
}

// Dodanie obsługi zdarzeń
document.getElementById("statusForm").addEventListener("submit", updateStatus);

// Pobranie danych przy ładowaniu strony
fetchStatus();
