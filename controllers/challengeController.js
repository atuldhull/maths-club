import supabase from "../config/supabase.js";

export const getCurrentChallenge = async (req, res) => {

  const { data, error } = await supabase
    .from("challenges")
    .select("*")
    .order("week", { ascending: false })
    .limit(1);

  if (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch challenge" });
  }

  res.json(data[0]);
};