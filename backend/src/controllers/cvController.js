import Cv from '../models/Cv.js'

const ALLOWED_FIELDS = [
  'title',
  'personal',
  'summary',
  'experience',
  'education',
  'skills',
  'sectionsOrder',
  'customSections',
  'paperSize',
  'templateId',
  'themeColor',
]

function pickCvFields(body = {}) {
  const data = {}
  for (const key of ALLOWED_FIELDS) {
    if (body[key] !== undefined) data[key] = body[key]
  }
  return data
}

function notFound(res) {
  return res.status(404).json({ message: 'Không tìm thấy CV' })
}

export async function getCvs(req, res) {
  const cvs = await Cv.find({ owner: req.userId }).sort({ updatedAt: -1 })
  res.json(cvs)
}

export async function getCvById(req, res) {
  const cv = await Cv.findOne({ _id: req.params.id, owner: req.userId })
  if (!cv) return notFound(res)
  res.json(cv)
}

export async function createCv(req, res) {
  const cv = await Cv.create({ ...pickCvFields(req.body), owner: req.userId })
  res.status(201).json(cv)
}

export async function updateCv(req, res) {
  const cv = await Cv.findOneAndUpdate(
    { _id: req.params.id, owner: req.userId },
    pickCvFields(req.body),
    { new: true, runValidators: true }
  )
  if (!cv) return notFound(res)
  res.json(cv)
}

export async function deleteCv(req, res) {
  const cv = await Cv.findOneAndDelete({ _id: req.params.id, owner: req.userId })
  if (!cv) return notFound(res)
  res.status(204).send()
}
