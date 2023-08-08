const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  membership_status: { type: String, required: true },
});

UserSchema.virtual("name").get(function () {
    let fullname = "";
    if (this.first_name && this.last_name) {
      fullname = `${this.last_name}, ${this.first_name}`;
    }
    return fullname;
  });

module.exports = mongoose.model("User", UserSchema);