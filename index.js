"use strict";

const nodemailer = require("nodemailer");
require("dotenv").config();

exports.sendEmail = (request, response) => {
  // TODO: set up secret in github, then check X-Hub-Signature to make sure it matches

  if (request.method !== "POST") {
    response.status(405).json("Only the POST method is supported.");
  }

  if (request.headers["x-github-event"] !== "push") {
    response.status(501).json("Only push events are supported.");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.FROM_EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: process.env.TO_EMAIL,
    subject: `[${request.body.repository.name}] ${
      request.body.size
    } new commits by ${request.body.commits[0].author.name}`,
    html: buildCommitList(request.body.commits)
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      response.status(500).json(error);
    } else {
      response.status(200).send(info);
    }
  });
};

exports.event = (event, callback) => {
  callback();
};

const buildCommitList = commits => {
  let listString = '<ul style="list-style-type: none; margin: 0; padding: 0">';

  commits.forEach(commit => {
    listString += `<li><a href="${commit.url}">${commit.sha}</a> ${
      commit.message
    }</li>`;
  });

  return (listString += "</ul>");
};
