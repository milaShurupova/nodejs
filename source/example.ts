export class DemoHelper {

    public static async waitXSecondsAsync(seconds: number): Promise<void> {
        console.log("  ");
        await setTimeout(() => {
            console.log(" ");
            return;
        }, seconds);
    }

}

// usage >>


// try {
//     await DemoHelper.waitXSecondsAsync(delayInSeconds);

//     return res.status(200).json({
//         message: `Timeout is ${delayInSeconds} second(s)`
//     });
// }
// catch (error) {
//     return resizeBy.sendStatus(400);
// }



