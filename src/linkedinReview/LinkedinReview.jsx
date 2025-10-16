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







// import React, { useState } from "react";
// import axios from "axios";
// import "./LinkedinReview.css";
// import "./LinkedinReview.css";

// const LinkedinReview = () => {
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("");
//   const [profileText, setProfileText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [aiResult, setAiResult] = useState(null);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setAiResult(null);

//     if (!role || !profileText) {
//       setError("⚠️ Please fill all required fields before submitting.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axios.post("http://localhost:4000/chat", {
//         email: email || "anonymous@example.com",
//         role,
//         profile_text: profileText,
//       });

//       console.log("✅ Server Response:", response.data);
//       setAiResult(response.data);
//     } catch (err) {
//       console.error("❌ Error analyzing profile:", err);
//       setError("Something went wrong. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="linkedin-review-container">
//       <h1 className="title">LinkedIn Profile Review (AI)</h1>

//       <form className="review-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Email (optional):</label>
//           <input
//             type="email"
//             placeholder="yourname@example.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         <div className="form-group">
//           <label>Role you're targeting:</label>
//           <input
//             type="text"
//             placeholder="e.g., Frontend Developer"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Paste your LinkedIn About section:</label>
//           <textarea
//             rows="8"
//             placeholder="Paste your LinkedIn About / Bio here..."
//             value={profileText}
//             onChange={(e) => setProfileText(e.target.value)}
//             required
//           />
//         </div>

//         <button className="analyze-btn" type="submit" disabled={loading}>
//           {loading ? "Analyzing..." : "Analyze Profile"}
//         </button>
//       </form>

//       {error && <p className="error-msg">{error}</p>}

//       {aiResult && (
//         <div className="ai-result">
//           <h2>AI Review Result</h2>

//           <p><strong>Score:</strong> {aiResult.score ?? "N/A"} / 100</p>
//           <p><strong>Headline:</strong> {aiResult.headline}</p>
//           <p><strong>Summary:</strong> {aiResult.summary}</p>

//           {aiResult.suggestions && aiResult.suggestions.length > 0 && (
//             <div className="suggestions">
//               <h3>Suggestions:</h3>
//               <ul>
//                 {aiResult.suggestions.map((s, i) => (
//                   <li key={i}>{s}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LinkedinReview;






import { useState } from "react";
import axios from "axios";

function App() {
    const [profile, setProfile] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        try {
            const res = await axios.post("http://localhost:4000/analyze", {
                profileText: profile,
                targetRole: role,
            });
            setResult(res.data);
        } catch {
            alert("Error analyzing profile");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-bold mb-4">AI LinkedIn Profile Review</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg"
            >
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
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                >
                    {loading ? "Analyzing..." : "Get AI Review"}
                </button>
            </form>

            {result && (
                <div className="mt-6 bg-white p-6 rounded-xl shadow-md w-full max-w-lg">
                    <h2 className="text-xl font-semibold mb-2">Score: {result.score}/100</h2>
                    <h3 className="font-semibold">Headline Suggestion:</h3>
                    <p className="mb-3">{result.headline}</p>
                    <h3 className="font-semibold">Rewritten Summary:</h3>
                    <p className="mb-3">{result.summary}</p>
                    <h3 className="font-semibold">Top Suggestions:</h3>
                    <ul className="list-disc ml-5">
                        {result.suggestions.map((s, i) => (
                            <li key={i}>{s}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default App;
