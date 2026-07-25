import mongoose from 'mongoose'

const cvSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    fullName: { type: String, required: true },
    email: String,
    phone: String,
    summary: String,
    experience: [
      {
        company: String,
        role: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],
    education: [
      {
        school: String,
        degree: String,
        startDate: String,
        endDate: String,
      },
    ],
    skills: [String],
  },
  { timestamps: true }
)

export default mongoose.model('Cv', cvSchema)
