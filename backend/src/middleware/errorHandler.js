export function errorHandler(err, req, res, next) {
  console.error(err)

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'ID không hợp lệ' })
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message })
  }

  res.status(err.status || 500).json({ message: err.message || 'Server error' })
}
