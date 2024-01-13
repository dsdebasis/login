const userModel = require("../model/userSchema");

//user signup logic
const signup = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;


  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({
      msg: "everyfield is required"
    });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({
      msg: "confirm password did not match "
    })
  }
  try {
    const userInfo = userModel(req.body);
    const result = await userInfo.save();

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).json({
        success: false,
        msg: "account already exists"
      });
    }
    return res.status(400).json({
      success: false,
      message: e.message
    });
  }
}
async function signin(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "all fields are required"
    });
  }

  try{
    const user = await userModel.findOne({
      email
    }).select('+password')
  
    if (!user || user.password !== password) {
      return res.status(400).json({
        message: "email id or password don't match"
      });
    }
  
    const token = user.jwtToken();
    user.password= undefined;
    const cookieOption = {
          maxAge:24*60*60*1000,
          httpOnly:true
    }
  
    res.cookie("token",token,cookieOption);
    res.status(200).json({
      success:true,
      data:user
    })
  } catch(e){
    return res.status(400).json({
      
      message: e.message
    });
  }
  
}


module.exports = { signup, signin };