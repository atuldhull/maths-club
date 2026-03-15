import axios from "axios";
import supabase from "../config/supabase.js";

/* ===============================
GENERATE AI QUESTION
=============================== */

export const generateAIQuestion = async (req,res)=>{

try{

const prompt = `
Generate ONE engineering mathematics MCQ.

Return JSON only.

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

IMPORTANT:
- Options MUST NOT include labels like A., B., C., D.
- Each option must contain ONLY the mathematical expression.
- Use plain text math (pi, omega) instead of LaTeX like \\pi or \\omega.
`;

const response = await axios.post(
"https://openrouter.ai/api/v1/chat/completions",
{
model:"deepseek/deepseek-chat",
messages:[
{
role:"system",
content:"Return strictly valid JSON."
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

/* ===============================
CLEAN AI RESPONSE
=============================== */

let text = response.data?.choices?.[0]?.message?.content;

if(!text){
throw new Error("AI returned empty response");
}

// remove markdown
text = text.replace(/```json/g,"").replace(/```/g,"");

// remove invalid escape characters
text = text.replace(/\\(?!["\\/bfnrtu])/g,"");

// extract JSON block
const start = text.indexOf("{");
const end = text.lastIndexOf("}");

if(start !== -1 && end !== -1){
text = text.substring(start,end+1);
}

/* ===============================
PARSE JSON
=============================== */

const question = JSON.parse(text);

res.json(question);

}catch(err){

console.error("AI Generator Error:",err);

res.status(500).json({
error:"AI generation failed"
});

}

};


/* ===============================
SAVE QUESTION TO DATABASE
=============================== */

export const saveAIQuestion = async (req,res)=>{

try{

let question = req.body;

/* ===============================
SHUFFLE OPTIONS TO PREVENT
ALWAYS CORRECT = A
=============================== */

// store correct answer before shuffle
const correctAnswer = question.options[question.correct_index];

// shuffle options
const shuffledOptions = [...question.options].sort(()=>Math.random()-0.5);

// find new correct index
const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);

// update object
question.options = shuffledOptions;
question.correct_index = newCorrectIndex;

/* ===============================
INSERT INTO SUPABASE
=============================== */

const {error} = await supabase
.from("challenges")
.insert([question]);

if(error) throw error;

res.json({success:true});

}catch(err){

console.error("Database Insert Error:",err);

res.status(500).json({
error:"Failed to save question"
});

}

};