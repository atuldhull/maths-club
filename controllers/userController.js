import supabase from "../config/supabase.js";

export const getProfile = async (req,res)=>{

const userId = req.session.user?.id;

if(!userId){
return res.status(401).json({error:"Login required"});
}

const {data:user} = await supabase
.from("users")
.select("name,xp")
.eq("id",userId)
.single();

const xp = user.xp || 0;

const level = Math.floor(Math.sqrt(xp/50))+1;

res.json({
name:user.name,
xp,
level
});

};