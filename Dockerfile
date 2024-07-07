FROM golang:1.22.3

WORKDIR /app

COPY ./go.mod ./
RUN go mod download && go mod verify

RUN go install github.com/a-h/templ/cmd/templ@latest

RUN go get github.com/a-h/templ
RUN go get github.com/a-h/templ/runtime
RUN go get github.com/labstack/echo/v4

COPY ./handlers/* ./handlers/
COPY ./view/* ./view/
COPY ./static/* ./static/
COPY ./main.go .

RUN templ generate
RUN CGO_ENABLED=0 GOOS=linux go build -o ./app

EXPOSE 6969
EXPOSE 8000
CMD ["./app"]
