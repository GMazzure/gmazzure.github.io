// AWS Lambda function to handle contact form submissions
const AWS = require('aws-sdk');
const https = require('https');
const querystring = require('querystring');

// Configure AWS SDK
const SES = new AWS.SES({ region: 'us-east-1' }); // Change to your AWS region

// Your reCAPTCHA secret key
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

// Email configuration
const SOURCE_EMAIL = process.env.SOURCE_EMAIL; // The email address you've verified in SES
const DESTINATION_EMAIL = process.env.DESTINATION_EMAIL; // Your email address to receive form submissions

/**
 * Verify reCAPTCHA token
 * @param {string} token - The reCAPTCHA token to verify
 * @returns {Promise<boolean>} - Whether the token is valid
 */
const verifyRecaptcha = async (token) => {
  return new Promise((resolve, reject) => {
    const postData = querystring.stringify({
      secret: RECAPTCHA_SECRET_KEY,
      response: token
    });

    const options = {
      hostname: 'www.google.com',
      port: 443,
      path: '/recaptcha/api/siteverify',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          resolve(parsedData.success);
        } catch (error) {
          reject(new Error('Failed to parse reCAPTCHA response'));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
};

/**
 * Send email using AWS SES
 * @param {Object} formData - The form data
 * @returns {Promise<Object>} - The SES response
 */
const sendEmail = async (formData) => {
  const { name, email, message } = formData;
  
  const emailParams = {
    Source: SOURCE_EMAIL,
    Destination: {
      ToAddresses: [DESTINATION_EMAIL]
    },
    Message: {
      Subject: {
        Data: `New Contact Form Submission from ${name}`
      },
      Body: {
        Text: {
          Data: `
Name: ${name}
Email: ${email}
Message: ${message}

This message was sent from your website contact form.
          `
        },
        Html: {
          Data: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
<hr>
<p><em>This message was sent from your website contact form.</em></p>
          `
        }
      }
    }
  };
  
  return SES.sendEmail(emailParams).promise();
};

/**
 * Lambda handler function
 */
exports.handler = async (event) => {
  // Set up CORS headers
  const headers = {
    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*', // Restrict to your domain in production
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };
  
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS preflight successful' })
    };
  }
  
  try {
    // Parse request body
    const body = JSON.parse(event.body);
    const { name, email, message, recaptchaToken } = body;
    
    // Validate required fields
    if (!name || !email || !message || !recaptchaToken) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Missing required fields' })
      };
    }
    
    // Verify reCAPTCHA token
    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'reCAPTCHA verification failed' })
      };
    }
    
    // Send email
    await sendEmail({ name, email, message });
    
    // Return success response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Message sent successfully' })
    };
  } catch (error) {
    console.error('Error processing request:', error);
    
    // Return error response
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Internal server error' })
    };
  }
};