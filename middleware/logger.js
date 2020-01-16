// module.exports = (req, res, next) => {
//   console.log(`${req.ip} - ${req.protocol} - ${req.method} - 
//     ${req.url} - ${req.get("User-Agent")}`)

//   next();
// };

// HIGHER ORDER FUNCTION
module.exports = (type) => (req, res, next) => {
  if(type === "long") {
    console.log(`${req.ip} - ${req.protocol} - ${req.method} - 
    ${req.url} - ${req.get("User-Agent")}`);
  } else if (type === "short") {
    console.log(`${req.ip} - ${req.url} - ${req.get("User-Agent")}`)
  }

   next();
};