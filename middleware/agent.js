module.exports = (requireAgent) => (req, res, next) => {
  const userAgent = req.get("User-Agent").toLowerCase();
  if(!userAgent.includes(requireAgent)) {
    // return res.status(500).json({
    //   message: `Must be using ${requireAgent}.`
    // })
    return next(new Error(`Must be using ${requireAgent}.`))
  }

  next();
}