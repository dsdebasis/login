const signup = (req,res,next) => {
  const {name,eamil,password,confirmPassword}   = req.body;
  console.log(name,eamil,password,confirmPassword)
 return res.status(200).json({
  success:true,
  data:{}
 })
}

module.exports = signup;