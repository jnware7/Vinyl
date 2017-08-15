const router = require('express').Router()
const Album = require('../../models/albums')
const Review = require('../../models/reviews')

router.get('/:albumId/reviews/new', (req, res) => {
  Album.findById(req.params.albumId)
    .then(album => res.render('review', {album, session: req.session.passport}))
    .catch(error => res.status(500).render('error', {error}))
})

router.post('/:albumId/reviews/new', (req, res) => {
  const { content } = req.body
  const { albumId } =  req.params
  const userId = req.user.user_id
  Review.create(userId, albumId, content)
    .then(album => res.redirect(`/albums/${albumId}`))
    .catch(error => res.status(500).render('error', {error}))
})

router.get('/:albumID', (req, res) => {
  Album.findById(req.params.albumID)
    .then(album => res.render('album', {album, session: req.session.passport}))
    .catch(error => res.status(500).render('error', {error}))
})

module.exports = router
