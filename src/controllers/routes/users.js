const router = require('express').Router()
const User = require('../../models/users')

router.get('/profile', (req, res) => {
  res.redirect(`/users/${req.user.id}`)
})

router.get('/sign-out', (req, res) => {
  req.session.destroy(() => res.redirect('/'))
})

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.render('profile',{user}))
    .catch(error => res.status(500).render('error', {error}))
})


module.exports = router
