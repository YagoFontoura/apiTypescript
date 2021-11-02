import express,{Request,Response} from 'express';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import authConfig from '../../config/auth.json';
import { User } from '../models/users';



const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });

}

router.post('/register', async (req: Request, res:Response) => {
    const { email } = req.body;
    

    try {

        if (await User.findOne({ email }))
            return res.status(400).send({ error: 'User already exists' });

        const user = await User.create(req.body);
        
        user.password = undefined;
        
        return res.send({ user, token: generateToken({ id: user.id }) });

    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Registration failed' });
    }
});
            
router.post('/authenticate', async (req: Request, res:Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user)
        return res.status(400).send({ error: 'User not found' })

    if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Invalid Password' })

    user.password = undefined;


    res.send({
        user, token: generateToken({ id: user.id }),
    });
});


router.post('/reset_password', async (req, res) => {
    const { email, token, password } = req.body;

    try {
        const user = await User.findOne({ email})

        .select('+passwordResetToken passwordResetExpires');

        if(!user)
        return res.status(400).send({ error : 'User not found'});

        if(token !== user.passwordResetToken)
            return res.status(400).send ({error: 'Token invalid' });

        const now = new Date;

        if (now > user.passwordResetExpires)
        return res.status(400).send ({error : 'Token expired, generate a new one'});

        user.password = password;

        await user.save();

        res.send()


    }catch (err) {
        res.status(400).send( {error: 'Cannot reset password, try again' });
    }
});

export = (app: any) => app.use('/auth', router);