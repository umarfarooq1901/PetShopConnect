const userSignupController = async (req, res) => {
  try {
    console.log("signing up");
  } catch (error) {
    console.log("Error while signing up the user!", error);
  }
};

const userLoginController = async (req, res) => {
  try {
    console.log("login successfully");
  } catch (error) {
    console.log(error);
  }
};

const userDeleteController = async (req, res) => {
  try {
    console.log("delete successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userSignupController,
  userLoginController,
  userDeleteController,
};
