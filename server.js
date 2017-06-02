var express = require('express')
var bodyParser = require('body-parser')
var userdata = require('./userData.json')


var app = express()
app.use(bodyParser.json());

// get user
app.get('/api/users', (req, res) => {
  let q = req.query
  if (Object.keys(q).includes('favorites')) {
    var result = userdata.filter(function(e, i, arr){
      if (e.favorites.includes(q.favorites)) {
        return true
      }
    })
    return res.json(result)
  }


  if (Object.keys(q).includes('age')) {
    var result = userdata.filter(function(e, i, arr){
      if (e.age < q.age){
        return true
      }
    })
    return res.json(result)
  }
  if (Object.keys(q).includes('lastname')) {
    var result = userdata.filter(function(e, i, arr){
      if (e.last_name == q.lastname){
        return true
      }
    })
    return res.json(result)
    console.log(result)
  }

  if (Object.keys(q).includes('email')) {
    var testEmail = q.email;
    var result
    for (var i = 0; i < userdata.length; i++){
      if (userdata[i].email == testEmail){
        result = userdata[i]
      }
    }
    return res.json(result)
    console.log(result)
  }
  return res.json(userdata)
})

// get user by id
app.get('/api/users/:id', (req, res) => {
  var id = req.params.id

  for (var i = 0; i < userdata.length; i++){
    if (userdata[i].id == id){
      return res.json(userdata[i])
    }

  }
  return res.status(404).json(null)
})

// get admins
app.get('/api/admins', (req, res) => {
  var result = userdata.filter(function(e,i,arr){
    if (e.type == "admin"){
      return true
    }
  })
  return res.json(result)

})
//non admins
app.get('/api/nonadmins', (req, res) => {
  var result = userdata.filter(function(e,i,arr){
    if (e.type !== "admin"){
      return true
    }
  })
  return res.json(result)

})
// get by account type
app.get('/api/user_type/:userType', (req, res) => {
  var testType = req.params.userType
  var result = userdata.filter(function(e,i,arr){
    if (e.type == testType){
      return true;
    }
  })
  return res.json(result)

})
// update user by ID
app.put('/api/users/:userId', (req, res) => {
  // return res.send(req.body)
  var id = req.params.userId

  for (var i = 0; i < userdata.length; i++){
    if (userdata[i].id == id) {
       userdata[i] = req.body


    }
    // console.log(userdata[i])
  }
  return res.send(userdata)
  // return res.send(id)
})

// add user
app.post('/api/users', (req, res) => {
  var lastuser = userdata.length - 1
  var lastID = userdata[lastuser].id
  var newID = lastID + 1

  var newUser = req.body
  newUser.id = newID
  userdata.push(newUser)

  return res.send(userdata)
})

// delete user
app.delete('/api/users/:userId', (req, res) => {
  var target = req.params.userId
  for (var i = 0; i < userdata.length; i++){
    if (userdata[i].id == target){
      userdata.splice(i, 1)
    }
  }
  return res.json(userdata)
})


app.listen(3000, function(){
  console.log('magic happens on port 3k')
})
