import axios from "axios";
import supabase from "./config/supabase.js";

async function generateQuestion(){

const prompt = `
Generate ONE engineering mathematics MCQ.

Topics allowed:
Calculus
Linear Algebra
Laplace Transform
Differential Equations
Complex Numbers
Probability

Return ONLY JSON:

{
"title":"",
"question":"",
"options":["","","",""],
"correct_index":0,
"difficulty":"easy | medium | hard",
"points":50,
"theorem":"",
"method":"",
"hint":""
}
`;

const response = await axios.post(
"https://openrouter.ai/api/v1/chat/completions",
{
model:"deepseek/deepseek-chat",
messages:[
{
role:"system",
content:"You are a strict JSON generator."
},
{
role:"user",
content:prompt
}
],
temperature:0.3
},
{
headers:{
Authorization:`Bearer ${process.env.OPENROUTER_API_KEY}`,
"Content-Type":"application/json"
}
}
);

let text = response.data.choices[0].message.content;

text = text.replace(/```json/g,"").replace(/```/g,"");

const challenge = JSON.parse(text);

console.log("Generated Question:");
console.log(challenge);

const { error } = await supabase
.from("challenges")
.insert([challenge]);

if(error){
console.error(error);
}else{
console.log("Question inserted successfully");
}

}

generateQuestion();
