const express = require('express')
const { projects } = require('./data.json')
const app = express()

//use pug middleware
app.set('view engine', 'pug')

//set static file
app.use('/static', express.static('public'))

//index route
app.get('/', (req, res) => {
    res.render('index', {
        Projects: projects
    })
})

//personal info route
app.get('/about', (req, res) => {
    res.render('about')
})

//project route
app.get('/projects/:id', (req, res) => {
    res.render('project', {
        Project_name: projects[req.params.id].project_name,
        Description: projects[req.params.id].description,
        technologies: projects[req.params.id].technologies,
        Live: projects[req.params.id].live_link,
        GitHub: projects[req.params.id].github_link,
        ProjectImgs: projects[req.params.id].image_urls.slice(1)
    })
})


app.use((req, res, next) => {
    const err = new Error('Page Not Found')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status(err.status)
        res.render('page-not-found')
    } else {
        err.message = err.message || 'something goes wrong here'
        res.status(err.status || 500)
        res.render('error', { err })
    }
    console.log(err.message)
})



//set server
app.listen(3000, () => {
    console.log('The app is running on localhost:3000')
})