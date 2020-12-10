function isLibrarian(req, res, next) {
  if(req.user.role !== "librarian") {
    return res.status(403).json({error: "Access Forbidden"});
  }
  next();
}

module.exports = isLibrarian;