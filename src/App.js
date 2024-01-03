import { useEffect, useState } from "react";
import "./style.css";
import supabase from "./supabase";
const CATEGORIES = [
  { name: "who am i", color: "#3b82f6" },
  { name: "about", color: "#16a34a" },
  { name: "education", color: "#ef4444" },
  { name: "projects", color: "#eab308" },
  { name: "work experience", color: "#8b5cf6" },
  { name: "certifications", color: "#db2777" },
  { name: "awards", color: "#14b8a6" },
  { name: "volunteer exp.", color: "#f97316" },
  { name: "hobbies", color: "#eba664" },
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setcurrentCategory] = useState("about");

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);
        let query = supabase.from("Facts").select("*");
        if (currentCategory !== "all")
          query = query.eq("category", currentCategory);
        const { data: Facts, error } = await query
          .order("created_at", { ascending: true })
          .limit(100);
        setFacts(Facts);
        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory]
  );
  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        <CategoryFilter setcurrentCategory={setcurrentCategory} />
        {isLoading ? (
          <Loader />
        ) : (
          <FactsList facts={facts} setFacts={setFacts} />
        )}
      </main>
    </>
  );
}

function Loader() {
  return <p className="message">Loading...</p>;
}

function Header({ showForm, setShowForm }) {
  return (
    <header className="">
      <div className="logo">
        <img
          src="pic.jpeg"
          width="118"
          height="118"
          style={{ borderRadius: 100 }}
        />
        <h1>Sandeep Reddy Guthireddy</h1>
      </div>
      <button
        className="btn btn-large btn-open"
        onClick={() => setShowForm((showForm = !showForm))}
      >
        {showForm ? "Close" : "Enter New Fact"}
      </button>
    </header>
  );
}

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  // Fixed in a video text overlay
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const textLength = text.length;

  async function handleSubmit(e) {
    e.preventDefault();

    if (text && category && textLength <= 200) {
      // const newFact = {
      //   id: Math.round(Math.random() * 1000),
      //   text,
      //   source,
      //   category,
      //   votesInteresting: 24,
      //   votesMindblowing: 9,
      //   votesFalse: 4,
      //   createdIn: 2021,
      // };

      const { data: newFact, error } = await supabase
        .from("Facts")
        .insert([{ text, source, category }])
        .select();
      setFacts((facts) => [newFact[0], ...facts]);

      setText("");
      setSource("");
      setCategory("");

      setShowForm(false);
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the world..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>{200 - textLength}</span>
      <input
        value={source}
        type="text"
        placeholder="Trustworthy source..."
        onChange={(e) => setSource(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large">Post</button>
    </form>
  );
}

function CategoryFilter({ setcurrentCategory }) {
  return (
    <aside>
      <ul>
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="cat">
            <button
              className="btn btn-cat"
              style={{ backgroundColor: cat.color }}
              onClick={() => setcurrentCategory(cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactsList({ facts }) {
  if (facts.length === 0) {
    return <p> No Facts found for this Category, Create a New One</p>;
  }

  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} />
        ))}
      </ul>
    </section>
  );
}

function Fact({ fact }) {
  return (
    <li key={fact.id}>
      <p className="fact">
        {fact.text}
        <a className="source" href={fact.source} target="_blank">
          {fact.source ? "CLICK HERE" : ""}
        </a>
      </p>
    </li>
  );
}

export default App;
