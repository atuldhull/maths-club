import supabase from "../config/supabase.js";

export const getLeaderboard = async (req, res) => {

  const { data, error } = await supabase
    .from("users")
    .select("name,xp")
    .order("xp", { ascending: false })
    .limit(5);

  if (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch leaderboard" });
  }

  res.json(data);
};