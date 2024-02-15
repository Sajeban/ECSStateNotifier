const aws = require('aws-sdk');
// Change the region as needed
const ses = new aws.SES({region: 'ap-southeast-1'});

exports.notifyAlerts = async (event) => {
    const env = process.env.STAGE

    const params = {
        // Verify this email in SES
        Source: `critical-alerts-${env}@email-address.com`,

        // Verify recipient email as well
        Destination: {
            ToAddresses: ['email-address'],
        },
        Message: {
            Subject: {Data: `Server Stopped at ${event.time}`},
            Body: {
                Text: {Data: `More details: ${JSON.stringify(event)}`}
            }
        }
    };

    try {
        await ses.sendEmail(params).promise();
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email', error);
        throw error;
    }
};
