import supabase from "../config/supabase.js";

export const submitSolve = async (req,res)=>{

const {points} = req.body;
const userId = req.session.user?.id;

if(!userId) return res.status(401).json({error:"Login required"});

const {data,error} = await supabase.rpc('increment_xp',{
user_id:userId,
points_to_add:points
});

if(error) return res.status(500).json(error);

res.json({success:true});

};