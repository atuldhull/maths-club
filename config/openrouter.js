import fetch from "node-fetch";

export async function generateMathQuestion() {

  const response = await fetch(process.env.OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You generate math competition questions."
        },
        {
          role: "user",
          content: "Generate one challenging engineering mathematics question with 4 options and the correct answer."
        }
      ]
    })
  });

  const data = await response.json();

  return data.choices[0].message.content;
}