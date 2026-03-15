import supabase from "../config/supabase.js";

/* ==========================
   GET ALL EVENTS
========================== */

export const getEvents = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("event_date", { ascending: true });

    if (error) throw error;

    res.json(data);

  } catch (error) {
    console.error("Events Error:", error.message);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

/* ==========================
   GET SINGLE EVENT
========================== */

export const getEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    res.json(data);

  } catch (error) {
    console.error("Event Error:", error.message);
    res.status(500).json({ error: "Failed to fetch event" });
  }
};