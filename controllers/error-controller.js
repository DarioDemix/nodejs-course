exports.getNotFound = (req, res, next) => {
  res.status(404).render("404", { docTitle: "Page not found", path: '', links: req.links });
};
