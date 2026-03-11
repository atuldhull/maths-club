// Add this to your authController.js
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Set a session/cookie here if you're using express-session, 
    // or just return the user data to the frontend
    res.json({ 
      message: "Access Authorized", 
      user: data.user,
      session: data.session 
    });
  } catch (error) {
    res.status(401).json({ error: "Invalid credentials" });
  }
};

export default { register, login };