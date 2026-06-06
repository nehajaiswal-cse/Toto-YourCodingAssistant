const axios = require("axios");
const { extractCodeBlock } = require("./extractCodeBlock");

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

async function fixCodeResponse(code) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat",
        messages: [
          {
            role: "user",
            content: `
You are an expert web developer.

Fix any errors, bugs, styling issues, and JavaScript issues in the following code.

Return ONLY the corrected code in this exact format:

\`\`\`html
<!-- fixed html -->
\`\`\`

\`\`\`css
/* fixed css */
\`\`\`

\`\`\`javascript
// fixed js
\`\`\`

Code to fix:

HTML:
${code.html || ""}

CSS:
${code.css || ""}

JavaScript:
${code.js || ""}
`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data?.choices?.[0]?.message?.content;

    if (!data) {
      throw new Error("No response from AI");
    }

    const codeBlocks = extractCodeBlock(data);

    return {
      reply: data,
      code: codeBlocks,
    };
  } catch (error) {
    console.error("AI Fix Error:", error.response?.data || error.message);

    throw new Error(
      error.response?.data?.error?.message ||
        error.message ||
        "AI code fixing failed"
    );
  }
}

module.exports = fixCodeResponse;