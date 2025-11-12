# Sistema de Notas para Classe de Aula - Backend

## Description

Backend API for Sistema de Notas para Classe de Aula - a system for storing student grades, maintaining data in a database, and showing who passed or failed.

## Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: Microsoft SQL Server
- **Validation**: Zod

## Project Structure

```
src/
├── api/                    # API Controllers
│   └── v1/                 # API Version 1
│       ├── internal/       # Authenticated endpoints
│       └── external/       # Public endpoints
├── routes/                 # Route definitions
│   └── v1/                 # Version 1 routes
├── middleware/             # Express middleware
├── services/               # Business logic services
├── utils/                  # Utility functions
├── constants/              # Application constants
├── instances/              # Service instances
├── config/                 # Configuration
└── server.ts               # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Microsoft SQL Server
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Configure database connection in `.env`

### Development

Run the development server:
```bash
npm run dev
```

The server will start on `http://localhost:3000` (or the port specified in `.env`)

### Build

Build for production:
```bash
npm run build
```

### Production

Start production server:
```bash
npm start
```

## API Documentation

### Base URL

- Development: `http://localhost:3000/api/v1`
- Production: `https://api.yourdomain.com/api/v1`

### Health Check

```
GET /health
```

Returns server health status.

## Environment Variables

See `.env.example` for all available environment variables.

### Required Variables

- `DB_SERVER`: Database server address
- `DB_PORT`: Database port (default: 1433)
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name

## Database

The database layer follows a schema-based architecture:

- `config/`: System configuration
- `functional/`: Business logic and entities
- `security/`: Authentication and authorization
- `subscription/`: Account management

Database scripts are located in the `database/` directory at the project root.

## Contributing

Please follow the established coding standards and patterns documented in the knowledge base.

## License

ISC