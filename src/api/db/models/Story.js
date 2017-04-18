import mongoose from 'mongoose';
//bcrypt  for hassing the password cause we should not store password as it is as for
//security constraints
import bcrypt from 'bcrypt-nodejs';
var Story = mongoose.Schema({
  data:Array,
  title:String,
  genre   : String,
  poster  : String,
  name    : String,
  author  : String,
  comments: Array,
  likedBy : Array,
  time:String
});

export default mongoose.model('stories',Story);
