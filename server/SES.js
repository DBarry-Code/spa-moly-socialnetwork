const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets.json"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-central-1",
});

exports.sendEmail = (email, code) => {
    return ses
        .sendEmail({
            Source: "Barry`s Social Network <d.barry@gmx.de>",
            Destination: {
                ToAddresses: [email],
            },
            Message: {
                Body: {
                    Text: {
                        Data: "You code is:" + code + " and only 10 min valid",
                    },
                },
                Subject: {
                    Data: "Your code for password Reset",
                },
            },
        })
        .promise()
        .then(() => console.log("Email? : it worked!"))
        .catch((err) => console.log(err));
};
