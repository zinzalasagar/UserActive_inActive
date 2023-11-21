const mongoose = require('mongoose');

const signupschema = mongoose.Schema({
    
    username  :{
        type  : String,
        require : true,
    },
    email: {
        type: String,
        require: true,
        match: [
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            "Invalid email address",
          ],
    },
    password : {
        type : String,
        require : true,
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
          ],
    },
})

const signup = mongoose.model('signup', signupschema);
module.exports = signup;