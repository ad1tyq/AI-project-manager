### AI Project Manager
# Description :
A frontend website powered by an AI — you chat with it, give it a prompt, and it generates an entire project file for you.
Think of it as your AI-powered project assistant. The AI is integrated using an API, but coding it to build files and store them was a fun challenge.Combining UI with smart AI behaviour.

# Uses :
Has a Gemini chatbot in it, which is accessed by an API.
The chatbot also functions as a project assistant.
If the following prompt is added to it, then it creates a new project with the details requested by the user.

# prompt :
"project : xyz & about : prompt" (remove the quotations, and keep the prompt similar).

# eg. ->
project : CAI project & about : give me an innovative ai based idea for my first year project and write me a research paper on it



# MUJ HackX 3.0- Official Website

Made with ❤️ by Team HackX

## Frontend Setup

### Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **npm** : Package manager
- **Git**: Version control system

### Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone https://github.com/AwesomeSam9523/HackX3.0
   cd HackX3.0
   ```

2. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   
   ```

### Development

4. **Start the development server**:
   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

### Technology Stack

- **Framework**: Next.js 15.3.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP
- **3D Graphics**: Spline Tool
- **Icons**: Lucide React


### Code Quality

The project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for git hooks
- **lint-staged** for pre-commit checks

### Building for Production

```bash
npm run build
npm run start
```

### Docker (Optional)

If you prefer to use Docker:

```bash
docker build -t hackx-frontend .
docker run -p 3000:3000 hackx-frontend
```
