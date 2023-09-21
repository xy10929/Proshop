import jwt from 'jsonwebtoken'

const genarateToken = (res, userId) => {
  //create token, payload-userId
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

  //set jwt as HTTP-only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    //production->https->true
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    //30 days
  })
}

export default genarateToken
