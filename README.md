# Juicebox x Feather test

# Setup

## Install

```bash
yarn
```

## Environment

1. Copy the file `.env.example` to `.env`
2. Create a new application on on https://dev.usekeyp.com.

- Set the redirect URI to `http://localhost:3000/api/auth/callback/keyp` (note that your port may be different).
- Copy the "CLIENT ID" for your application and set it to `KEYP_CLIENT_ID` in `.env`

3. In the `.env`, set `TOKEN_SECRET` to a random string e.g. `openssl rand -base64 32`. (Do not use your access token here)

# Run

```bash
yarn dev
```
