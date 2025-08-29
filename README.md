# Underwriting Load Application

## Set up

- Clone the repository
- Install dependencies:

Tools used:
- Node.js v22.10.0
- Next.js as backend
- React as frontend
- TypeScript for type safety
- Tailwind CSS for fast styling
- SASS for CSS pre-processing and organization
- PostCSS for CSS processing
- React Hook Form for form handling
- Zod - Validation
- Jest for testing
- Docker for containerization

```bash
npm install
```

- Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To access the history page, you can visit [http://localhost:3000/history](http://localhost:3000/history).
To apply for a loan, you can visit [http://localhost:3000/apply](http://localhost:3000/apply).

- Run tests:
```bash
npm run test
```

- Run Docker:
```bash
docker build -t loan-form-dev .
docker run --rm -it -p 3000:3000 \
  -v "$PWD":/app \
  -v /app/node_modules \
  loan-form-dev
```

## Approach to the problem

Things I consider before starting:
- What to use for the backend that allow me an easy setup and deployment
- What to use for form validation
- Where or how to store the data
- What components I needed to build the application
- Any tool to set a basic styling for UI

Just as I listed the key points, I started building the application in that order, also keeping in mind the best practices for React and Next.js, and a user-friendly experience.

## Some challenges and learnings

One challenge I faced was that I haven't used Next.js before, so I had to learn how routes work and how the file structure affects it.

I wanted to not repeat myself if possible, and I picked Zod for validation since it allows me to share the schema between the frontend and the backend, I like that is very straightforward and easy to use.

The same happened with the storage, I selected localStorage for simplicity since at the end this is a small application and setting up a database or a cloud storage service would be overkill.

And tried to keep the time I spent on styling to a minimum, so I used Tailwind CSS for styling.

Typescript has a lot of features, but it also has a neverending learning curve, so catching errors and debugging can be a bit challenging, specially in very complex or extensive logic.
