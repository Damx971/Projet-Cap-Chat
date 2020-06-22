let express = require('express')
let fs = require('fs')
let bodyParser = require('body-parser')
let session = require('express-session')
let upload = require('express-fileupload')
let app = express()

// Moteur de template
app.set('view engine', 'ejs')

// Middleware
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  secret: 'ehzejkzelezm',
  resave: false, 
  saveUninitialized: true, 
  cookie:{secure:false}
}))
app.use(require('./middlewares/flash'))
app.use(upload())

// Routes Get
app.get('/', (request, response) => {
  response.render('capchat', {
    data: JSON.parse(fs.readFileSync('public/images/LesChats.json', 'utf8'))
  })
})

app.get('/register', (request, response) => {
  response.render('register')
})

app.get('/login', (request, response) => {
  response.render('login')
})

app.get('/login/upload', (request, response) => {
  let Upload = require('./models/mod_upload')
  Upload.all(function(themes){
  response.render('upload', {themes: themes})
  })
})

app.get('/login/upload/uploadimg', (request, response) => {
  response.render('uploadimg')
})

// Routes Post
app.post('/register', (request, response) =>{
  if (request.body.login === undefined || request.body.login === '' || request.body.mdp === undefined || request.body.mdp === ''){
  request.flash('error', "Erreur de saisie !")
  response.redirect('/register')
  }
 else
  {
    let Register = require('./models/mod_register')
    Register.create(request.body.login, request.body.mdp, function(){
    request.flash('success', "Vous etes bien inscrit")
    response.redirect('/login')
    })
  }
})

app.post('/login', (request, response) =>{
  if (request.body.login === undefined || request.body.login === '' || request.body.mdp === undefined || request.body.mdp === ''){
  request.flash('error', "Erreur de saisie !")
  response.redirect('/login')
  }
 else
  {
    let Login = require('./models/mod_login')
    Login.verif(request.body.login, request.body.mdp, function(statut){
   if(statut==='success'){
      request.flash('success', "Connection réussi")
      response.redirect('/login/upload')
    }
    else
    {
      request.flash('error', "Echec de la connection")
      response.redirect('/login')
    }
    })
  }
})

app.post('/login/upload', (request, response) =>{
  if (request.body.name === undefined || request.body.name === '' || 
    request.body.theme === undefined || request.body.theme === '' || 
    request.body.indice === undefined || request.body.indice === ''){
  request.flash('error', "Erreur de saisie !")
  response.redirect('/login/upload')
  }
 else
  {
    let Upload = require('./models/mod_upload')
    Upload.load(request.body.name, request.body.theme, request.body.indice, function(){
    response.redirect('/login/upload/uploadimg')
    })
  }
})

app.post('/login/upload/uploadimg', (request, response) =>{
  if(request.files){
    console.log(request.files)
    let img1 = request.files.img1
    let filename = img1.name
    console.log(filename)

    img1.mv('./public/images/neutres/'+filename, function(err){
      if(err){
        console.log(err)
      }
    })
  }

  if(request.files){
    console.log(request.files)
    let img2 = request.files.img2
    let filename = img2.name
    console.log(filename)

    img2.mv('./public/images/neutres/'+filename, function(err){
      if(err){
        console.log(err)
      }
    })
  }

  if(request.files){
    console.log(request.files)
    let img3 = request.files.img3
    let filename = img3.name
    console.log(filename)

    img3.mv('./public/images/neutres/'+filename, function(err){
      if(err){
        console.log(err)
      }
    })
  }

  if(request.files){
    console.log(request.files)
    let img4 = request.files.img4
    let filename = img4.name
    console.log(filename)

    img4.mv('./public/images/neutres/'+filename, function(err){
      if(err){
        console.log(err)
      }
    })
  }

  if(request.files){
    console.log(request.files)
    let img5 = request.files.img5
    let filename = img5.name
    console.log(filename)

    img5.mv('./public/images/neutres/'+filename, function(err){
      if(err){
        console.log(err)
      }
    })
  }

  if(request.files){
    console.log(request.files)
    let img6 = request.files.img6
    let filename = img6.name
    console.log(filename)

    img6.mv('./public/images/neutres/'+filename, function(err){
      if(err){
        console.log(err)
      }
    })
  }

  if(request.files){
    console.log(request.files)
    let img7 = request.files.img7
    let filename = img7.name
    console.log(filename)

    img7.mv('./public/images/neutres/'+filename, function(err){
      if(err){
        console.log(err)
      }
    })
  }

  if(request.files){
    console.log(request.files)
    let img8 = request.files.img8
    let filename = img8.name
    console.log(filename)

    img8.mv('./public/images/neutres/'+filename, function(err){
      if(err){
        console.log(err)
      }
    })
  }

  if(request.files){
    console.log(request.files)
    let img9 = request.files.img9
    let filename = img9.name
    console.log(filename)

    img9.mv('./public/images/neutres/'+filename, function(err){
      if(err){
        console.log(err)
      }
    })
  }

  if(request.files){
    console.log(request.files)
    let imgSinguliere = request.files.imgSinguliere
    let filename = imgSinguliere.name
    console.log(filename)

    imgSinguliere.mv('./public/images/singuliers/'+filename, function(err){
      if(err){
        console.log(err)
      }
    })
  }

  request.flash('success', "Ajout réussi")
  response.redirect('/login/upload')
})

//Routes inconnu
app.use(function(request, response, next){
  response.setHeader('Content-Type', 'text/plain');
  response.status(404).send('Page introuvable !');
});

// Port 80
app.listen(80)
