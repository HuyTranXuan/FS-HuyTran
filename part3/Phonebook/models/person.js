const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI
console.log('connecting to', url)
mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
  // const noDash = {
  //   validator: function(v) {return v.toString().length >= 8
  //   },message: props => `${props.value} is not a valid phone number( must be 8)!`
  //   }

const many = {
  validator: v => {
    if(!v.includes('-')){
      return v.toString().length >= 8
    } else {
      const num = v.split('-')
      if(num.length === 2 && (num[0].length === 2 || num[0].length === 3)){
        const typeA = /\d/.test(num[0])
        const typeB = /\d/.test(num[1])
        console.log(typeA,typeB,'--------------------')
        return typeA && typeB
      } else return v.toString().length >= 999
    }
  },
  message: props => {
    if(props.value.toString().includes('-')){
      return `${props.value} is not a valid phone number pattern!`
    } else {
      return `${props.value} is not a valid phone number( must be 8)!`}
    }
}
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    required: true,
    validate: many
  },
})
personSchema.plugin(uniqueValidator)
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
module.exports = mongoose.model('Person', personSchema)
