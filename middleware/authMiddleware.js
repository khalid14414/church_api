import jwt from 'jsonwebtoken'


export const verifyToken = (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1]
        console.log(token)
        if (!token) {
            return res.status(401).json({ error: 'No token provided' })
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid token' })
            }
            req.user = decoded.id
            next()
        })
    } catch (error) {
       return res.status(500).json({ message: 'Invalid or expired token', error: error.message })
    }
}