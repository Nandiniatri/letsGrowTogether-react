// import { useState } from "react";
// import axios from "axios";

// function App() {
//   const [url, setUrl] = useState("");
//   const [feedback, setFeedback] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async () => {
//     if (!url.trim()) {
//       setError("Please enter a LinkedIn profile URL");
//       return;
//     }
//     setError("");
//     setLoading(true);
//     setFeedback(null);  

//     try {
//       // abhi LinkedIn se data fetch nahi kar rahe — mock karenge
//       const dummyProfile = `
//         Name: Sample User
//         Headline: Frontend Developer | React | JavaScript
//         About: Passionate about clean UI and interactive web design.
//       `;

//       const res = await axios.post("http://localhost:4000/analyze", {
//         profileText: dummyProfile,
//         targetRole: "Frontend Developer",
//         email: "demo@example.com",
//       });

//       setFeedback(res.data);
//     } catch (err) {
//       console.error(err);
//       setError("Something went wrong! Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-4 text-blue-600">
//         AI LinkedIn Profile Review
//       </h1>
//       <p className="text-gray-600 mb-6 text-center max-w-md">
//         Enter your LinkedIn profile URL and get AI-powered suggestions to
//         improve it instantly.
//       </p>

//       <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-lg flex gap-3">
//         <input
//           type="text"
//           placeholder="Enter your LinkedIn URL..."
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-blue-500"
//         />
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
//         >
//           {loading ? "Analyzing..." : "Get Feedback"}
//         </button>
//       </div>

//       {error && <p className="text-red-600 mt-3">{error}</p>}

//       {feedback && (
//         <div className="bg-white shadow-lg mt-8 rounded-xl p-6 w-full max-w-2xl text-left">
//           <h2 className="text-xl font-bold mb-3 text-blue-600">AI Feedback</h2>
//           <p><b>Score:</b> {feedback.score}</p>
//           <p className="mt-2"><b>Headline:</b> {feedback.headline}</p>
//           <p className="mt-2"><b>Summary:</b> {feedback.summary}</p>

//           <div className="mt-3">
//             <b>Suggestions:</b>
//             <ul className="list-disc ml-5 mt-1 text-gray-700">
//               {feedback.suggestions?.map((s, i) => (
//                 <li key={i}>{s}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;



import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!url.trim()) {
      setError("Please enter a LinkedIn profile URL");
      return;
    }

    setError("");
    setLoading(true);
    setFeedback(null);

    try {
      // 🔹 STEP 1: Fetch LinkedIn profile data from backend
      const profileRes = await axios.post("http://localhost:4000/fetch-profile", {
        profileUrl: url,
      });

      if (!profileRes.data?.name && !profileRes.data?.headline) {
        throw new Error("Unable to fetch LinkedIn data. Make sure the profile is public.");
      }

      const profileText = `
        Name: ${profileRes.data.name}
        Headline: ${profileRes.data.headline}
        About: ${profileRes.data.about}
      `;

      // 🔹 STEP 2: Send scraped data for AI analysis
      const analyzeRes = await axios.post("http://localhost:4000/analyze", {
        profileText,
        targetRole: "Frontend Developer",
        email: "demo@example.com",
      });

      setFeedback(analyzeRes.data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong! Try again or ensure your LinkedIn is public.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">
        AI LinkedIn Profile Review
      </h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Enter your LinkedIn profile URL and get AI-powered suggestions to
        improve it instantly.
      </p>

      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-lg flex gap-3">
        <input
          type="text"
          placeholder="Enter your LinkedIn URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-blue-500"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Analyzing..." : "Get Feedback"}
        </button>
      </div>

      {error && <p className="text-red-600 mt-3">{error}</p>}

      {feedback && (
        <div className="bg-white shadow-lg mt-8 rounded-xl p-6 w-full max-w-2xl text-left">
          <h2 className="text-xl font-bold mb-3 text-blue-600">AI Feedback</h2>
          <p><b>Score:</b> {feedback.score}</p>
          <p className="mt-2"><b>Headline:</b> {feedback.headline}</p>
          <p className="mt-2"><b>Summary:</b> {feedback.summary}</p>

          <div className="mt-3">
            <b>Suggestions:</b>
            <ul className="list-disc ml-5 mt-1 text-gray-700">
              {feedback.suggestions?.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
