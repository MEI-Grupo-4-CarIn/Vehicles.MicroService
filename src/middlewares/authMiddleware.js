const jwt = require('jsonwebtoken');

const PUB_KEY = process.env.JWT_PUBLIC_KEY.replace(/\\n/g, '\n');
const SECRET_KEY = process.env.SERVICE_SECRET_KEY;

function authMiddleware(allowedRoles) {
    return function (req, res, next) {
        const userAuthHeader = req.headers.authorization;
        const serviceAuthHeader = req.headers['service-authorization'];

        if (userAuthHeader) {
            const token = userAuthHeader.split(' ')[1];
            jwt.verify(token, PUB_KEY, { algorithms: ['RS256'] }, (err, user) => {
                if (!err) {
                    // Check if the user's role is allowed
                    if (allowedRoles.includes(user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])) {
                        req.user = user;
                        next();
                    } else {
                        res.status(403).send({ message: 'User role not allowed.' });
                    }
                } else if (serviceAuthHeader) {
                    const token = serviceAuthHeader.split(' ')[1];
                    jwt.verify(token, SECRET_KEY, { algorithms: ['HS256'] }, (err, service) => {
                        if (!err) {
                            // Check if the service is allowed
                            if (service.service === 'Routes.MicroService') {
                                req.service = service;
                                next();
                            } else {
                                res.status(403).send({ message: 'Invalid service.' });
                            }
                        } else {
                            res.status(403).send({ message: 'Invalid service token.' });
                        }
                    });
                } else {
                    res.status(403).send({ message: 'Invalid user token.' });
                }
            });
        } else if (serviceAuthHeader) {
            const token = serviceAuthHeader.split(' ')[1];
            jwt.verify(token, SECRET_KEY, { algorithms: ['HS256'] }, (err, service) => {
                if (!err) {
                    // Check if the service is allowed
                    if (service.service === 'Routes.MicroService') {
                        req.service = service;
                        next();
                    } else {
                        res.status(403).send({ message: 'Invalid service.' });
                    }
                } else {
                    res.status(403).send({ message: 'Invalid service token.' });
                }
            });
        } else {
            res.status(401).send({ message: 'Authorization header not found.' });
        }
    }
}

module.exports = authMiddleware;