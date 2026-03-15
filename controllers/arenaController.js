import supabase from "../config/supabase.js";

/* =========================
   SUBMIT SOLUTION
========================= */

export const submitSolve = async (req,res)=>{

const { challengeId, selectedIndex } = req.body;
const userId = req.session.user?.id;

if(!userId){
return res.status(401).json({error:"Login required"});
}

/* =========================
CHECK IF USER ALREADY SOLVED
========================= */

const {data:existingAttempt} = await supabase
.from("attempts")
.select("*")
.eq("user_id",userId)
.eq("challenge_id",challengeId)
.maybeSingle();

if(existingAttempt){

const {data:challenge} = await supabase
.from("challenges")
.select("options,correct_index,theorem,method,hint")
.eq("id",challengeId)
.single();

return res.json({
alreadySolved:true,
correct:existingAttempt.correct,
xp:existingAttempt.xp_earned,
correctIndex: challenge.correct_index,
theorem: challenge.theorem || "Theorem not specified.",
method: challenge.method || "Method not specified.",
hint: challenge.hint || "Hint unavailable."
});

}

/* =========================
GET CHALLENGE
========================= */

const {data:challenge,error} = await supabase
.from("challenges")
.select("*")
.eq("id",challengeId)
.single();

if(error) return res.status(500).json(error);

/* =========================
CHECK ANSWER
========================= */

const correct = selectedIndex === challenge.correct_index;

const xp = correct ? challenge.points : 0;

/* =========================
SAVE ATTEMPT
========================= */

await supabase
.from("attempts")
.insert({
user_id:userId,
challenge_id:challengeId,
answer:selectedIndex,
correct,
xp_earned:xp
});

/* =========================
UPDATE USER XP
========================= */

if(correct){

const {data:user} = await supabase
.from("users")
.select("xp")
.eq("id",userId)
.single();

await supabase
.from("users")
.update({xp:user.xp + xp})
.eq("id",userId);

}

/* =========================
RESPONSE
========================= */

res.json({
correct,
correctIndex: challenge.correct_index,
xp,
theorem: challenge.theorem || "Theorem not specified.",
method: challenge.method || "Method not specified.",
hint: challenge.hint || "Hint unavailable."
});

};


/* =========================
USER HISTORY
========================= */

export const getHistory = async (req,res)=>{

const userId = req.session.user?.id;

if(!userId){
return res.status(401).json({error:"Login required"});
}

const {data,error} = await supabase
.from("attempts")
.select(`
answer,
correct,
xp_earned,
created_at,
challenges(
title,
question,
options,
correct_index,
theorem,
method,
hint
)
`)
.eq("user_id",userId)
.order("created_at",{ascending:false});

if(error) return res.status(500).json(error);

res.json(data);

};
