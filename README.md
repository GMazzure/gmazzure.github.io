# React + TypeScript + Vite Portfolio with Secure Contact Form

This project is a personal portfolio website built with React, TypeScript, and Vite, featuring a secure contact form with bot protection that sends submissions to an AWS Lambda function.

## Features

- Responsive design with Tailwind CSS
- Contact form with multiple layers of bot protection:
  - Google reCAPTCHA integration
  - Honeypot field
  - Server-side validation
- Serverless backend using AWS Lambda and SES for email delivery
- Form validation and error handling

## Contact Form Implementation

The contact form has been implemented with security in mind:

1. **Frontend**: React component with form validation, reCAPTCHA, and honeypot field
2. **Backend**: AWS Lambda function that verifies the reCAPTCHA token and sends emails via AWS SES

For detailed implementation instructions, see the [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) file.

## Setup and Configuration

### Prerequisites

- Node.js and npm
- AWS account
- Google reCAPTCHA account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the contact form by following the instructions in the [lambda/README.md](./lambda/README.md) file.

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Testing

```bash
npm test
```