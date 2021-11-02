import { Request ,Response , NextFunction} from 'express'
const jwt = require ('jsonwebtoken');
const authConfig = require('../../config/auth.json');

export = (req: Request , res: Response, next:NextFunction) => {
    const authHeader = req.headers.authorization;

 if (!authHeader)
    return res.status(401).send({error: 'No token provided'});

    const parts:Array<string> = authHeader.split(' ');
    
 if(parts.length !== 2) 
        return res.status(401).send({error: 'Token error'});

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({error: 'Token malformatted'});

        jwt.verify(token, authConfig.secret, (err: Error, decoded:any) => {
            if(err) return res.status(401).send({error: 'Token Invalid'});

        req.body.userId = decoded.id;
        return next();
        })
        
    
};