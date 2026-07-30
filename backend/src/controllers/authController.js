import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { generateToken } from '../utils/generateToken.js'

function toPublicUser(user) {
  return { id: user._id, username: user.username, email: user.email }
}

export async function register(req, res) {
  const { username, email, password, confirmPassword } = req.body

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Vui lòng nhập đầy đủ tên đăng nhập, email và mật khẩu' })
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  }
  if (confirmPassword !== undefined && password !== confirmPassword) {
    return res.status(400).json({ message: 'Mật khẩu xác nhận không khớp' })
  }

  const existing = await User.findOne({ $or: [{ username }, { email }] })
  if (existing) {
    const field = existing.username === username ? 'Tên đăng nhập' : 'Email'
    return res.status(409).json({ message: `${field} đã được sử dụng` })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  let user
  try {
    user = await User.create({ username, email, passwordHash })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Tên đăng nhập hoặc email đã được sử dụng' })
    }
    throw err
  }

  res.status(201).json({ user: toPublicUser(user), token: generateToken(user._id) })
}

export async function login(req, res) {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Vui lòng nhập tên đăng nhập và mật khẩu' })
  }

  const user = await User.findOne({ username })
  if (!user) {
    return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' })
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash)
  if (!isMatch) {
    return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' })
  }

  res.json({ user: toPublicUser(user), token: generateToken(user._id) })
}
