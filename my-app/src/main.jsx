import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';

const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Define redirect URLs for after sign in/up
const clerkOptions = {
  publishableKey: key,
  // Redirect to homepage after sign in and sign up
  signInRedirectUrl: window.location.origin,
  signUpRedirectUrl: window.location.origin,
  // Adding a small delay to ensure complete state update
  afterSignInUrl: window.location.origin,
  afterSignUpUrl: window.location.origin
};

createRoot(document.getElementById('root')).render(
  <ClerkProvider {...clerkOptions}>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </ClerkProvider>
)
