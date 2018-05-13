Proxy for Slack Realtime Messaging API
=====

## Usage

### Docker

Copy `.env.example` as `.env`.

```
$ cp .env.example .env
```

Edit `.env`.

```.env
SLACK_TOKEN=xoxb-???
DESTINATION=https://example.jp/slack_message

http_proxy=http://your.proxy:port/
NO_PROXY_FOR_DESTINATION=true
```

Run.

```
$ docker run --env-file .env -it hizumi/slack-rtm-proxy
```
