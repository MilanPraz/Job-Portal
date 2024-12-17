This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Job Listing Web Application

This project is a web application for creating and managing job listings. It includes features such as dynamic job descriptions, image uploads, and form validation, making it a robust tool for companies to post and manage job opportunities.

---

## Features

- **Job Creation and Management**:
  - Add job title, description, company details, and more.
  - Upload a company logo using Cloudinary.
  - Select job type, category, and application deadlines.
- **Dynamic Form Validation**: Real-time form validation with clear error messages using `react-hook-form` and Zod.
- **Rich Text Editor**: Use React Quill for creating detailed job descriptions.
- **Dynamic Navigation**: Navigation links adapt to active states, including dynamic routes.
- **Responsive Design**: Fully responsive and styled with Tailwind CSS.

---

## Technologies Used

### Frontend

- **[Next.js](https://nextjs.org/)**: Framework for building server-rendered React applications.
- **[useContext]()**: used for handling the global state
- **[React Hook Form](https://react-hook-form.com/)**: Lightweight library for form validation and management.
- **[Zod](https://zod.dev/)**: Schema validation library for defining and validating inputs.
- **[React-Quill](https://github.com/zenoamaro/react-quill)**: Rich text editor for job descriptions.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for styling.
- **[Lucide Icons](https://lucide.dev/)**: Icon library for visual enhancements.

### Backend

- **[Cloudinary](https://cloudinary.com/)**: Cloud-based media management for storing and retrieving uploaded images.

### Additional Packages

- **[React Hot Toast](https://react-hot-toast.com/)**: Toast notifications for success or error messages.
- **[ShadCN UI Components](https://shadcn.dev/)**: Pre-designed components for consistent UI.

---

## Project Structure

```
src/
|-- components/
|   |-- ui/             # Custom reusable UI components (Input, Button, Select, etc.)
|-- schema/             # Zod schemas for form validation
|-- server/
|   |-- actions/        # API calls and server-side actions
|-- cloudinary/         # Cloudinary utility functions for image uploads
```

---

## Installation and Setup

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env.local` file and add the following:

   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   NEXT_PUBLIC_CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   NEXT_PUBLIC_CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

---

## Key Functionalities

### Job Creation Form

- **Form Validation**: Using `react-hook-form` and Zod for robust validation.
- **Rich Text Editor**: Powered by React Quill for creating and styling job descriptions.
- **Image Upload**: Leverages Cloudinary for storing and retrieving company logos.

### Dynamic Navigation

- Active states for navigation links, including dynamic routes.
- Responsive navigation menu.

### Toast Notifications

- Provides instant feedback to users after form submissions using `react-hot-toast`.

### Category and Job Type Selection

- Dropdown selection using ShadCN's `Select` component with custom validation.

---

## Deployment

This project can be deployed on any platform that supports Next.js, such as Vercel or Netlify.

### Deploying to Vercel

1. Connect your repository to Vercel.
2. Add the environment variables under the project settings in Vercel.
3. Deploy your project.

---

## Contributing

Feel free to contribute to this project by creating a pull request or reporting issues.

---

## Future Enhancements

- Add user authentication and role-based access control.
- Implement a job search and filter functionality.
- Allow applicants to apply for jobs directly through the platform.

---

## License

This project is licensed under the MIT License.
