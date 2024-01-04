FROM node:18

RUN apt-get update && apt-get install -y tini
ENTRYPOINT ["/usr/bin/tini", "--"]

COPY api /app/api/
COPY web /app/web/

EXPOSE 3001

CMD ["node", "/app/api/src/index.js"]
