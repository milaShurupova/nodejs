import { Request, Response, NextFunction } from 'express';

const getHelloWorld = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: "Hello World!"
    });
};

const getWithTimeout = async (req: Request, res: Response, next: NextFunction) => {
    setTimeout(() => {
        return res.status(200).json({
            message: "Timeout is 1 second"
        });
    }, 1000); 
};

const getWithDelay = async (req: Request, res: Response, next: NextFunction) => {
// REad the delay in seconds from request parameter
let delayInSeconds: number = parseInt(req.params.seconds);

    setTimeout(() => {
        return res.status(200).json({
            message: `Timeout is ${delayInSeconds} second(s)`
        });
    }, delayInSeconds * 1000); 
};

const getWithDelayValidated = async (req: Request, res: Response, next: NextFunction) => {
    // REad the delay in seconds from request parameter
    const secondsStringParameter: string = req.params.seconds;
    if (isNaN(Number(secondsStringParameter))) {
        // Error response with an error message
        // return res.status(406).json({
        //     error: "Incorrect seconds parameter value"
        // });

        // Error response without an error message
        return res.sendStatus(406);
    }
    else {
        let delayInSeconds: number = parseInt(req.params.seconds);
        setTimeout(() => {
            return res.status(200).json({
                message: `Timeout is ${delayInSeconds} second(s)`
            });
        }, delayInSeconds * 1000); 
    }
    };

export default { getHelloWorld, getWithTimeout, getWithDelay, getWithDelayValidated };