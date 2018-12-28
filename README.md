# webhooks-demo

Get email notifications for new GitHub commits using webhooks and serverless Google Cloud Functions

![Demo](/screenshots/demo.gif "Demo")

## Getting Started

### Install dependencies

```
$ npm install
```

### Choose a FaaS provider

### Set up email account credentials

Add a `.env` file in the root directory. This file contains sensitive information like usernames and passwords that should not be checked into the code repository. Add the following entries to this file:

```
FROM_EMAIL=youremail@gmail.com
FROM_EMAIL_PASSWORD=YourAppSpecificPassword
TO_EMAIL=youremail@gmail.com
```
