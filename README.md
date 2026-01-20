# StackSeed

**CLI-first backend boilerplate generator for production-ready Node.js applications.**

## Overview

StackSeed scaffolds enterprise-grade backend projects with authentication, validation, and best practices built-in. Generate a complete TypeScript + Express + MongoDB backend with one command—no manual setup required.

## Features

- **One-command scaffolding**: `npx stackseed my-app`
- **Production-ready architecture**: Modular structure with separation of concerns
- **Built-in authentication**: JWT-based auth with refresh tokens
- **Automatic validation**: Class-validator DTOs for type-safe request validation
- **Security first**: Helmet, CORS, bcrypt, and secure cookie handling
- **TypeScript native**: Full type safety across the entire stack
- **Developer experience**: Hot reload, error handling, and clean code structure
- **Zero configuration**: Works out of the box with sensible defaults

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken) with bcrypt
- **Validation**: class-validator + class-transformer
- **Security**: Helmet, CORS, cookie-parser
- **Development**: ts-node-dev with hot reload

## Installation

```bash
npx stackseed my-backend-app
```

Or install globally:

```bash
npm install -g stackseed
stackseed my-backend-app
```

## Quick Start

1. **Create a new project:**

```bash
npx stackseed my-app
```

2. **Navigate to project:**

```bash
cd my-app
```

3. **Install dependencies:**

```bash
npm install
```

4. **Configure environment:**

```bash
# .env file is auto-generated, update with your values
nano .env
```

5. **Start development server:**

```bash
npm run dev
```

Your backend is now running at `http://localhost:5000` 

## Project Structure

StackSeed generates a clean, modular architecture:

```
my-app/
├── src/
│   ├── modules/              # Feature modules
│   │   └── auth/            # Authentication module
│   │       ├── auth.controller.ts   # Request handlers
│   │       ├── auth.service.ts      # Business logic
│   │       ├── auth.repository.ts   # Database operations
│   │       ├── auth.model.ts        # Mongoose schema
│   │       ├── auth.dto.ts          # Validation DTOs
│   │       ├── auth.routes.ts       # Route definitions
│   │       └── README.md            # Module documentation
│   ├── middlewares/         # Custom middleware
│   │   └── validate.middleware.ts   # DTO validation
│   ├── utils/               # Utility functions
│   │   ├── ApiError.ts      # Error handling
│   │   ├── ApiResponse.ts   # Response formatting
│   │   └── asyncHandler.ts  # Async error wrapper
│   ├── config/              # Configuration
│   │   ├── database.ts      # MongoDB connection
│   │   └── env.ts           # Environment variables
│   ├── app.ts               # Express app setup
│   └── server.ts            # Server entry point
├── .env                     # Environment variables
├── .env.example             # Environment template
├── package.json
├── tsconfig.json
└── README.md
```

## Commands

### Development

```bash
npm run dev          # Start development server with hot reload
```

### Production

```bash
npm run build        # Compile TypeScript to JavaScript
npm start            # Run production server
```

## API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Refresh Token
```http
POST /api/auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Logout
```http
POST /api/auth/logout
```

## Configuration

Environment variables are managed in `.env`:

```env
# Server
PORT=5000

# Database
MONGO_URI=mongodb://127.0.0.1:27017/myapp

# JWT Secrets (Change these in production!)
ACCESS_TOKEN_SECRET=your-access-token-secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=your-refresh-token-secret
REFRESH_TOKEN_EXPIRY=7d
```

### Security Best Practices

- **Change default secrets**: Generate strong random secrets for production
- **Use environment variables**: Never commit `.env` to version control
- **Enable HTTPS**: Use SSL/TLS in production
- **Rate limiting**: Add rate limiting middleware for production
- **Input validation**: All DTOs are validated automatically

## Validation

StackSeed uses `class-validator` for automatic request validation:

```typescript
// Example DTO
export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    name!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @MinLength(6)
    @MaxLength(100)
    password!: string;
}
```

Invalid requests return detailed error messages:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed: Name is required; Email must be valid",
  "errors": [
    {
      "field": "name",
      "constraints": {
        "isNotEmpty": "Name is required"
      }
    }
  ]
}
```

## Adding New Modules

Create a new feature module following the same pattern:

```bash
src/modules/users/
├── users.controller.ts
├── users.service.ts
├── users.repository.ts
├── users.model.ts
├── users.dto.ts
└── users.routes.ts
```

### Module Template

```typescript
// users.dto.ts
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username!: string;
}

// users.routes.ts
import { Router } from 'express';
import { validateDto } from '../../middlewares/validate.middleware';
import { CreateUserDto } from './users.dto';
import usersController from './users.controller';

const router = Router();
router.post('/', validateDto(CreateUserDto), usersController.create);

export default router;
```

## Error Handling

Centralized error handling with custom `ApiError` class:

```typescript
// Throw errors anywhere in your code
throw new ApiError(404, 'User not found');

// Async errors are caught automatically
export const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) throw new ApiError(404, 'User not found');
    res.json(new ApiResponse(200, user, 'User retrieved'));
});
```

## Database

MongoDB connection is configured automatically. The connection:

- Auto-reconnects on failure
- Logs connection status
- Uses Mongoose for schema validation
- Supports all MongoDB features

### Example Model

```typescript
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+@\w+\.\w+$/, 'Invalid email']
    }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
```

## Deployment

### Build for Production

```bash
npm run build
```

### Environment Setup

1. Set production environment variables
2. Use a process manager (PM2, systemd)
3. Set up reverse proxy (nginx)
4. Enable SSL/TLS
5. Configure MongoDB replica set

### Example PM2 Configuration

```json
{
  "apps": [{
    "name": "my-app",
    "script": "dist/server.js",
    "instances": "max",
    "exec_mode": "cluster",
    "env": {
      "NODE_ENV": "production"
    }
  }]
}
```

## Development

### Prerequisites

- Node.js >= 18.x
- MongoDB >= 6.x
- npm or yarn

### Local Development

```bash
# Clone the StackSeed repository
git clone https://github.com/yourusername/stackseed.git
cd stackseed

# Install dependencies
npm install

# Build the CLI
npm run build

# Test locally
npm link
stackseed test-project
```

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Roadmap

- [ ] PostgreSQL/MySQL support
- [ ] GraphQL template option
- [ ] Docker configuration
- [ ] CI/CD templates (GitHub Actions, GitLab CI)
- [ ] Testing setup (Jest, Supertest)
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Rate limiting middleware
- [ ] File upload handling
- [ ] Email service integration
- [ ] Logging (Winston, Morgan)

## FAQ

**Q: Can I use this with PostgreSQL?**  
A: Currently MongoDB only. PostgreSQL support is planned.

**Q: How do I add more authentication strategies?**  
A: Extend the auth module with passport.js or custom strategies.

**Q: Is this production-ready?**  
A: Yes, but review security settings and add rate limiting for production.

**Q: Can I customize the generated code?**  
A: Absolutely! The generated code is yours to modify.

## License

MIT License - see [LICENSE](LICENSE) file for details.


