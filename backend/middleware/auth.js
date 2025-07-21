const adminAuth = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || authorization !== process.env.ADMIN_PASSWORD) {
        return res.status(403).json({ message: 'Forbidden: Invalid credentials' });
    }
    next();
};

module.exports = adminAuth;