import mongoose from 'mongoose'

const experienceSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    role: { type: String, default: '' },
    company: { type: String, default: '' },
    start: { type: String, default: '' },
    end: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { _id: false }
)

const educationSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    school: { type: String, default: '' },
    degree: { type: String, default: '' },
    start: { type: String, default: '' },
    end: { type: String, default: '' },
  },
  { _id: false }
)

const customSectionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, default: '' },
    content: { type: String, default: '' },
  },
  { _id: false }
)

const personalSchema = new mongoose.Schema(
  {
    avatar: { type: String, default: null },
    fullName: { type: String, default: '' },
    title: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
  },
  { _id: false }
)

const cvSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, default: 'CV chưa đặt tên' },
    personal: { type: personalSchema, default: () => ({}) },
    summary: { type: String, default: '' },
    experience: { type: [experienceSchema], default: [] },
    education: { type: [educationSchema], default: [] },
    skills: { type: [String], default: [] },
    sectionsOrder: {
      type: [String],
      default: ['summary', 'experience', 'education', 'skills'],
    },
    customSections: { type: [customSectionSchema], default: [] },
    paperSize: { type: String, enum: ['a4', 'letter'], default: 'a4' },
    templateId: { type: String, default: null },
    themeColor: { type: String, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
        return ret
      },
    },
  }
)

export default mongoose.model('Cv', cvSchema)
