import Cv from '../models/Cv.js'

export async function getCvs(req, res) {
  const cvs = await Cv.find().sort({ createdAt: -1 })
  res.json(cvs)
}

export async function getCvById(req, res) {
  const cv = await Cv.findById(req.params.id)
  if (!cv) return res.status(404).json({ message: 'CV not found' })
  res.json(cv)
}

export async function createCv(req, res) {
  const cv = await Cv.create(req.body)
  res.status(201).json(cv)
}

export async function updateCv(req, res) {
  const cv = await Cv.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!cv) return res.status(404).json({ message: 'CV not found' })
  res.json(cv)
}

export async function deleteCv(req, res) {
  const cv = await Cv.findByIdAndDelete(req.params.id)
  if (!cv) return res.status(404).json({ message: 'CV not found' })
  res.status(204).send()
}
