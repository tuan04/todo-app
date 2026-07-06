# Todo App

A simple Todo Management application built with Spring Boot, React, and PostgreSQL.

## Features

- Create a new task
- Update task information
- Delete a task
- Mark task as Pending / In Progress / Completed
- Search tasks by title
- Filter tasks by status

## Tech Stack

### Backend

- Java 21
- Spring Boot
- Spring Data JPA
- PostgreSQL
- MapStruct
- Maven

### Frontend

- React
- TypeScript
- Vite
- Ant Design
- Tailwind CSS
- TanStack React Query
- Axios

## Run with Docker

### Prerequisites

- Docker Desktop

### Start

```bash
docker compose up --build
```

Frontend

```
http://localhost
```

Backend

```
http://localhost:8000
```

## Run without Docker

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API

| Method | Endpoint        | Description |
| ------ | --------------- | ----------- |
| GET    | /api/tasks      | Get tasks   |
| POST   | /api/tasks      | Create task |
| PUT    | /api/tasks/{id} | Update task |
| DELETE | /api/tasks/{id} | Delete task |

## Live Demo

Frontend

```
https://...
```

Backend

```
https://...
```

## Author

Ha Thanh Tuan
