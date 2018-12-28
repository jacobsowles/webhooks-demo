# webhooks-demo

Get email notifications for new GitHub commits using webhooks and serverless Google CloudFunctions

![Demo](/screenshots/demo.gif "Demo")

## Getting Started

### Install dependencies

```
$ npm install -g serverless
$ npm install
```

### Create a Google Cloud app and credentials

Follow [this guide](https://serverless.com/framework/docs/providers/google/guide/credentials/). Serverless has similar instructions on their website [for other FaaS providers](https://serverless.com/framework/docs/providers/) if you're not using Google CloudFunctions.

### Set up email account credentials

[Create an App Password](https://support.google.com/accounts/answer/185833?hl=en) for your serverless function to use. This allows the function to authenticate with Gmail.

Next, add a `.env` file in the root directory. This file contains sensitive information like usernames and passwords that should not be checked into the code repository. Add the following entries to this file:

```
FROM_EMAIL=youremail@gmail.com
FROM_EMAIL_PASSWORD=YourAppPassword
TO_EMAIL=youremail@gmail.com
```

Note that the app password is the one you created in the previous set, NOT your regular Gmail user password.

### Deploy your function

```
$ serverless deploy
```
Once finished, you'll be presented with a URL that runs your function when hit with an HTTP request.

### Set up a webhook in GitHub

Go to the settings page of the GitHub repository you want to get commit notifications from, then click Webhooks in the sidebar. Create a new webhook and paste in the function URL generated in the serverless deploy step into the Payload URL field. Leave the other settings at their default values, make sure the Active checkbox is checked at the bottom of the form, and save the webhook.

### Test your webhook

Commit and push a change to the GitHub repository that has the webhook configured. If everything is set up correctly, you should receive an email containing the details of the commit shortly after the push.
