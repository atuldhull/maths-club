import supabase from "../config/supabase.js";

// Register controller using Supabase
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Create the user in Supabase Auth
    // Supabase automatically hashes the password for you!
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username, // Storing the username in metadata
          xp: 0,              // Initializing new members with 0 XP
          title: "Axiom Scout" // Starting title
        }
      }
    });

    if (error) throw error;

    // 2. Success response
    res.json({ 
      message: "User registered successfully. Please check your email for verification!",
      user: data.user 
    });

  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(500).json({ error: error.message || "Registration failed" });
  }
};

export default {
  register,
};