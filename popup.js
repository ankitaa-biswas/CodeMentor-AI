// // document.addEventListener("DOMContentLoaded", () => {
// //     chrome.storage.local.get("submittedCode", (data) => {
// //         if (data.submittedCode) {
// //             // For now, mock feedback
// //             const feedback = `
// //                 ✅ Code formatting is clean.\n
// //                 ⚠️ Consider adding more comments.\n
// //                 ⚠️ Optimize loops to reduce time complexity.
// //             `;
// //             document.getElementById("feedback").innerText = feedback;
// //         } else {
// //             document.getElementById("feedback").innerText = 
// //                 "No code found. Please click 'Review My Code' on a LeetCode problem page.";
// //         }
// //     });
// // });


// document.addEventListener("DOMContentLoaded", () => {
//     chrome.storage.local.get("submittedCode", (data) => {
//         console.log("Popup retrieved:", data.submittedCode);
//         const feedbackDiv = document.getElementById("feedback");
//         if (data.submittedCode) {
//             const feedback = `
//                 ✅ Code formatting is clean.
//                 ⚠️ Add more comments for clarity.
//                 ⚠️ Optimize loops to reduce time complexity.
//             `;
//             feedbackDiv.innerText = `Your Code:\n${data.submittedCode}\n\nAI Feedback:\n${feedback}`;
//         } else {
//             feedbackDiv.innerText = "No code found. Click 'Review My Code' on LeetCode first.";
//         }
//     });
// });


document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get("submittedCode", async (data) => {
        const feedbackDiv = document.getElementById("feedback");

        if (data.submittedCode) {
            feedbackDiv.innerText = "Reviewing your code...";

            try {
                const res = await fetch("http://localhost:5001/review", { // <-- change to your port
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code: data.submittedCode })
                });

                const result = await res.json();
                feedbackDiv.innerText = `AI Feedback:\n${result.feedback}`;
            } catch (error) {
                feedbackDiv.innerText = "Error fetching review.";
                console.error(error);
            }
        } else {
            feedbackDiv.innerText = "No code found. Click 'Review My Code' on LeetCode first.";
        }
    });
});
