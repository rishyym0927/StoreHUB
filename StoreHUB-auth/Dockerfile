
FROM golang:1.23.1-alpine

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download && go mod verify

COPY . .

RUN go build -v -o /usr/local/bin/myapp ./main.go

EXPOSE 3000

CMD ["/usr/local/bin/myapp"]
