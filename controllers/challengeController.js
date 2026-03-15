import supabase from "../config/supabase.js";

/* ===============================
GET CURRENT CHALLENGE
=============================== */

export const getCurrentChallenge = async (req,res)=>{

try{

const {data,error} = await supabase
.from("challenges")
.select("*")
.order("created_at",{ascending:false})
.limit(1)
.single();

if(error) throw error;

data.theorem = data.theorem || "Theorem not specified.";
data.method = data.method || "Method not specified.";
data.hint = data.hint || "Hint unavailable.";

res.json(data);

}catch(err){

console.error("Challenge Error:",err);

res.status(500).json({
error:"Failed to fetch challenge"
});

}

};
