import supabase from "../config/supabase.js";

/* ==========================
   REGISTER
========================== */

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          xp: 0,
          title: "Axiom Scout"
        }
      }
    });

    if (error) throw error;

    res.json({
      message: "Registered successfully. Please check your email for verification!",
      user: data.user
    });

  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({ error: error.message || "Registration failed" });
  }
};

/* ==========================
   LOGIN
========================== */

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    // Store user in session
    req.session.user = {
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.name || "Member"
    };

    res.json({
      message: "Access Authorized",
      user: req.session.user
    });

  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(401).json({ error: "Invalid credentials" });
  }
};

/* ==========================
   LOGOUT
========================== */

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.json({ message: "Logged out successfully" });
  });
};

export default { register, login, logout };