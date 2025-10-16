// import { useState } from "react";
// import axios from "axios";

// function LinkedinReview() {
//     const [profile, setProfile] = useState("");
//     const [role, setRole] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [result, setResult] = useState(null);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setResult(null);
//         try {
//             const res = await axios.post("http://localhost:4000/analyze", {
//                 profileText: profile,
//                 targetRole: role,
//             });
//             setResult(res.data);
//         } catch (err) {
//             alert("Error analyzing profile");
//         }
//         setLoading(false);
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
//             <h1 className="text-3xl font-bold mb-4">AI LinkedIn Profile Review</h1>

//             <form
//                 onSubmit={handleSubmit}
//                 className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg"
//             >
//                 <input
//                     type="text"
//                     placeholder="Target Role (e.g. Frontend Developer)"
//                     className="border p-2 rounded w-full mb-3"
//                     value={role}
//                     onChange={(e) => setRole(e.target.value)}
//                 />
//                 <textarea
//                     placeholder="Paste your LinkedIn About / Summary..."
//                     className="border p-2 rounded w-full h-40 mb-3"
//                     value={profile}
//                     onChange={(e) => setProfile(e.target.value)}
//                 ></textarea>
//                 <button
//                     disabled={loading}
//                     className="bg-blue-600 text-white px-4 py-2 rounded w-full"
//                 >
//                     {loading ? "Analyzing..." : "Get AI Review"}
//                 </button>
//             </form>

//             {result && (
//                 <div className="mt-6 bg-white p-6 rounded-xl shadow-md w-full max-w-lg">
//                     <h2 className="text-xl font-semibold mb-2">
//                         Score: {result.score}/100
//                     </h2>
//                     <h3 className="font-semibold">Headline Suggestion:</h3>
//                     <p className="mb-3">{result.headline}</p>
//                     <h3 className="font-semibold">Rewritten Summary:</h3>
//                     <p className="mb-3">{result.summary}</p>
//                     <h3 className="font-semibold">Top Suggestions:</h3>
//                     <ul className="list-disc ml-5">
//                         {result.suggestions?.map((s, i) => (
//                             <li key={i}>{s}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default LinkedinReview;










// import { useState } from "react";
// import axios from "axios";

// function LinkedinReview() {
//     const [email, setEmail] = useState("");
//     const [role, setRole] = useState("");
//     const [profile, setProfile] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [result, setResult] = useState(null);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Validation to prevent empty request
//         if (!role.trim() || !profile.trim()) {
//             alert("Please enter both Target Role and LinkedIn About text.");
//             return;
//         }

//         setLoading(true);
//         setResult(null);

//         try {
//             const res = await axios.post("http://localhost:4000/chat", {
//                 email: email || "test@example.com", // optional
//                 role: role.trim(),
//                 profile_text: profile.trim(),
//             });

//             setResult(res.data);
//         } catch (err) {
//             console.error("Error analyzing profile:", err);
//             alert(
//                 err.response?.data?.error || "Something went wrong while analyzing profile"
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
//             <h1 className="text-3xl font-bold mb-4">AI LinkedIn Profile Review</h1>

//             <form
//                 onSubmit={handleSubmit}
//                 className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg"
//             >
//                 <input
//                     type="email"
//                     placeholder="Your Email (optional)"
//                     className="border p-2 rounded w-full mb-3"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />

//                 <input
//                     type="text"
//                     placeholder="Target Role (e.g. Frontend Developer)"
//                     className="border p-2 rounded w-full mb-3"
//                     value={role}
//                     onChange={(e) => setRole(e.target.value)}
//                 />

//                 <textarea
//                     placeholder="Paste your LinkedIn About / Summary..."
//                     className="border p-2 rounded w-full h-40 mb-3"
//                     value={profile}
//                     onChange={(e) => setProfile(e.target.value)}
//                 ></textarea>

//                 <button
//                     disabled={loading}
//                     className="bg-blue-600 text-white px-4 py-2 rounded w-full"
//                 >
//                     {loading ? "Analyzing..." : "Get AI Review"}
//                 </button>
//             </form>

//             {result && (
//                 <div className="mt-6 bg-white p-6 rounded-xl shadow-md w-full max-w-lg">
//                     <h2 className="text-xl font-semibold mb-2">
//                         Score: {result.score}/100
//                     </h2>

//                     <h3 className="font-semibold">Headline Suggestion:</h3>
//                     <p className="mb-3">{result.headline}</p>

//                     <h3 className="font-semibold">Rewritten Summary:</h3>
//                     <p className="mb-3">{result.summary}</p>

//                     <h3 className="font-semibold">Top Suggestions:</h3>
//                     <ul className="list-disc ml-5">
//                         {result.suggestions?.map((s, i) => (
//                             <li key={i}>{s}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default LinkedinReview;







import { useState } from "react";
import axios from "axios";

function LinkedinReview() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role.trim() || !profile.trim()) {
      alert("Please enter both Target Role and LinkedIn About text.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post("http://localhost:4000/chat", {
        email: email || "test@example.com",
        role: role.trim(),
        profile_text: profile.trim(),
      });
      setResult(res.data);
    } catch (err) {
      console.error("Error analyzing profile:", err);
      alert(
        err.response?.data?.error ||
          "Server error. Please check backend connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">AI LinkedIn Profile Review</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg"
      >
        <input
          type="email"
          placeholder="Your Email (optional)"
          className="border p-2 rounded w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Target Role (e.g. Frontend Developer)"
          className="border p-2 rounded w-full mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <textarea
          placeholder="Paste your LinkedIn About / Summary..."
          className="border p-2 rounded w-full h-40 mb-3"
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
        ></textarea>

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          {loading ? "Analyzing..." : "Get AI Review"}
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-white p-6 rounded-xl shadow-md w-full max-w-lg">
          <h2 className="text-xl font-semibold mb-2">
            Score: {result.score}/100
          </h2>

          <h3 className="font-semibold">Headline Suggestion:</h3>
          <p className="mb-3">{result.headline}</p>

          <h3 className="font-semibold">Rewritten Summary:</h3>
          <p className="mb-3">{result.summary}</p>

          {result.suggestions?.length > 0 && (
            <>
              <h3 className="font-semibold">Top Suggestions:</h3>
              <ul className="list-disc ml-5">
                {result.suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default LinkedinReview;
