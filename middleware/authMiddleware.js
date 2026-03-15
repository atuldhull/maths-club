/* ==========================
   AUTH MIDDLEWARE
   Protects routes that require
   a logged-in session
========================== */

export const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ error: "Login required" });
  }
  next();
};