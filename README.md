## Background
Do financial summary of youtube video using Youtube transcripts and OpenAI

## how to run
- running web service
```
npm run dev
```
- As summarizing long videos (video > 20m) would take some time for OpenAI to summarize, we cannot delegate this to serverless functions.
- Instead, we need to run a backend worker (it can be on your own pc)
```
npm run worker
```