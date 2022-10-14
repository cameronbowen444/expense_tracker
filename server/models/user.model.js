const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is Required!"],
        minlength: [3, "First name must be at least 3 characters!"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name is Required!"],
        minlength: [3, "Last name must be at least 3 characters!"]
    },
    username: {
        type: String,
        required: [true, "username is Required!"],
        minlength: [3, "Username must be at least 3 characters!"]
    },
    email: {
        type: String,
        required: [true, "Email is Required!"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minlength: [8, "password must be at least 8 characters!"]
    },
    expenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expense"
    }]
}, {timestamps: true});

UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
        next();
    });
});

module.exports = mongoose.model('User', UserSchema);