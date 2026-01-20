# Contributing to StackSeed

Thank you for your interest in contributing to StackSeed! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Your environment (Node version, OS, etc.)

### Suggesting Features

We love new ideas! Please create an issue with:
- Clear description of the feature
- Use case and benefits
- Possible implementation approach

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/stackseed.git
   cd stackseed
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add tests if applicable
   - Update documentation

4. **Test your changes**
   ```bash
   npm run build
   npm link
   stackseed test-project
   cd test-project
   npm install
   npm run dev
   ```

5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Provide a clear description
   - Reference any related issues
   - Wait for review

## Development Setup

### Prerequisites
- Node.js >= 18.x
- npm or yarn
- MongoDB (for testing generated projects)

### Local Development

```bash
# Install dependencies
npm install

# Build the CLI
npm run build

# Link for local testing
npm link

# Test the CLI
stackseed my-test-app
```

### Project Structure

```
stackseed/
├── src/
│   └── index.ts          # CLI entry point
├── template/             # Boilerplate template
│   ├── src/
│   │   ├── modules/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   └── config/
│   └── package.json
├── package.json
└── tsconfig.json
```

## Code Style

- Use TypeScript
- Follow existing patterns
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

## Template Changes

When modifying the template:
1. Test the generated project thoroughly
2. Ensure all dependencies are in `template/package.json`
3. Update documentation if needed
4. Verify TypeScript compilation works

## Commit Messages

Use clear, descriptive commit messages:

```
feat: Add PostgreSQL support
fix: Resolve validation middleware bug
docs: Update installation instructions
refactor: Improve error handling
test: Add unit tests for auth service
```

## Testing

Before submitting a PR:
1. Build the CLI: `npm run build`
2. Generate a test project: `stackseed test-app`
3. Install dependencies: `cd test-app && npm install`
4. Run the dev server: `npm run dev`
5. Test all API endpoints
6. Verify TypeScript compilation: `npm run build`

## Questions?

Feel free to:
- Open an issue for discussion
- Join our community discussions
- Reach out to maintainers

## Code of Conduct

Be respectful, inclusive, and professional. We're all here to build something great together.

---

Thank you for contributing to StackSeed! 🚀
