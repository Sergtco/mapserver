FROM oven/bun:1
WORKDIR /app

COPY ./package.json .
COPY ./bun.lockb .
COPY ./index.ts .
COPY ./tsconfig.json .

RUN bun install
CMD bun build index.ts --outdir /static
