import { Router } from 'express'
import { protect } from '../middleware/auth.js'
import {
  getCvs,
  getCvById,
  createCv,
  updateCv,
  deleteCv,
} from '../controllers/cvController.js'

const router = Router()

router.use(protect)

router.get('/', getCvs)
router.get('/:id', getCvById)
router.post('/', createCv)
router.put('/:id', updateCv)
router.delete('/:id', deleteCv)

export default router
