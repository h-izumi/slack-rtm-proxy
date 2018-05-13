const HttpsProxyAgent = require('https-proxy-agent');
const { RTMClient } = require('@slack/client');

const axios = require('axios');
const moment = require('moment');

require('dotenv').config();

const token = process.env.SLACK_TOKEN;
const proxy = process.env.https_proxy || process.env.http_proxy;
const destination = process.env.DESTINATION;
const noProxyForDestination = proxy === undefined ? true : process.env.NO_PROXY_FOR_DESTINATION !== undefined;

if (destination === undefined) {
  log('DESTINATION is not specified.');
  return;
}

const log = message => {
  console.log(`[${moment().format()}] ${message}`);
};

let options = {};
if (proxy !== undefined) {
  log(`Use proxy for RTM: ${proxy}`);
  options.agent = new HttpsProxyAgent(proxy);
  log(`noProxyForDestination: ${noProxyForDestination}`);
}

let axiosOptions = {
  headers: { 'Content-Type': 'application/json' },
};
if (noProxyForDestination) {
  axiosOptions.proxy = false;
}

const rtmClient = new RTMClient(token, options);

rtmClient.on('message', event => {
  log('Received a message.');
  axios.post(destination, event, axiosOptions)
    .then(response => {
      log(`${response.status}: ${response.statusText}`);
    })
    .catch(error => {
      log(error);
    });
});

rtmClient.start();
log('RTM Client has been started.');
