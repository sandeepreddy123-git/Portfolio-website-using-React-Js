const CATEGORIES = [
  { name: "who am i", color: "#a3c2f6" }, // Light Blue - Slightly Lighter
  { name: "science", color: "#95b8f6" }, // Light Blue - Slightly Darker
  { name: "finance", color: "#acc7f6" }, // Light Blue - Different Lightness
  { name: "society", color: "#9fbff6" }, // Light Blue - Different Lightness
  { name: "entertainment", color: "#a8caf6" }, // Light Blue - Different Lightness
  { name: "health", color: "#a1c4f6" }, // Light Blue - Different Lightness
  { name: "history", color: "#98bdf6" }, // Light Blue - Different Lightness
  { name: "news", color: "#8bb1f6" }, // Light Blue - Different Lightness
];

const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");
factsList.innerHTML = "";
async function loadFacts() {
  const res = await fetch(
    "https://crfqttifajrybpngtpfs.supabase.co/rest/v1/Facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyZnF0dGlmYWpyeWJwbmd0cGZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYxNDAzNTAsImV4cCI6MjAwMTcxNjM1MH0.Ebmx_u7CO9n6vksXBqW72T9IzCLixZAO1S0P2ZtfVwI",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyZnF0dGlmYWpyeWJwbmd0cGZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYxNDAzNTAsImV4cCI6MjAwMTcxNjM1MH0.Ebmx_u7CO9n6vksXBqW72T9IzCLixZAO1S0P2ZtfVwI",
      },
    }
  );
  const data = await res.json();
  createFactsList(data);
}
loadFacts();

function createFactsList(dataArray) {
  const htmlArr = dataArray.map(
    (fact) => `<li class="fact">
      <p>
      ${fact.text}
      <a
      class="source"
      href="${fact.source}"
      target="_blank"
      >(Source)</a>
      </p>
      <span class="tag" style="background-color: ${
        CATEGORIES.find((cat) => cat.name === fact.category).color
      }"
                        >${fact.category}</span
                      >
                    </p>
                  </li>`
  );
  const html = htmlArr.join("");
  factsList.insertAdjacentHTML("afterbegin", html);
}

btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Enter New Fact";
  }
});
