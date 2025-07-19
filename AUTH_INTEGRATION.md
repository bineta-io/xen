# Authentication Integration for Xen Extension

This document explains how to integrate authentication with your Xen Chrome extension so users can login with their paid subscription.

## Overview

The authentication system allows users to:
1. Login through your web app via external messaging
2. Use their JWT tokens for API calls to your backend instead of OpenRouter
3. Fall back to OpenRouter if they have an API key but no subscription
4. Get prompted to login or add an OpenRouter key if neither is available

## Architecture

### Priority Order
1. **Authenticated users** → Use your backend API
2. **Users with OpenRouter API key** → Use OpenRouter API
3. **Users with neither** → Show login/API key options

### Components Added

- `background.ts` - Handles external messages from your web app
- `hooks/useAuth.ts` - Manages authentication state and JWT tokens
- Modified `hooks/useOpenRouter.ts` - Implements priority logic
- Updated `popup/index.tsx` - Shows auth status and login options

## Setup Instructions

### 1. Update URLs in Code

Replace the placeholder URLs with your actual endpoints:

**In `hooks/useOpenRouter.ts`:**
```typescript
const BACKEND_API_URL = "https://your-backend-url.com/api/v1/chat/completions"
```

**In `popup/index.tsx`:**
```typescript
const handleLogin = () => {
  openAuthUrl("https://your-auth-url.com/login?extension=true")
}
```

**In `background.ts` (optional):**
```typescript
if (changeInfo.status === 'complete' && tab.url?.includes('your-auth-success-url')) {
  // Close tab after successful auth
}
```

### 2. Get Your Extension ID

After building the extension:
1. Go to `chrome://extensions`
2. Find your extension and copy its ID
3. You'll need this ID for your web app integration

### 3. Configure External Messaging

The extension is configured to receive external messages. Your web app needs to send messages to the extension using the Chrome runtime API.

## Web App Integration

### 1. Send JWT Token to Extension

After successful authentication in your web app, send the JWT token to the extension:

```javascript
// In your web app after successful login
const extensionId = "your-extension-id-here"; // Get this from chrome://extensions

chrome.runtime.sendMessage(
  extensionId,
  {
    type: "AUTH_TOKEN",
    token: "your-jwt-token-here"
  },
  (response) => {
    if (response && response.success) {
      console.log("Token sent to extension successfully");
      // Optional: Close the auth tab or redirect user
      window.close();
    } else {
      console.error("Failed to send token to extension:", response?.message);
    }
  }
);
```

### 2. Handle Logout

Send logout message to extension:

```javascript
chrome.runtime.sendMessage(
  extensionId,
  {
    type: "LOGOUT"
  },
  (response) => {
    if (response && response.success) {
      console.log("Logged out from extension");
    }
  }
);
```

### 3. Example Integration Code

```html
<!DOCTYPE html>
<html>
<head>
    <title>Auth Integration Example</title>
</head>
<body>
    <script>
        // Check if this page was opened from the extension
        const urlParams = new URLSearchParams(window.location.search);
        const fromExtension = urlParams.get('extension') === 'true';
        
        if (fromExtension) {
            // This is an extension auth flow
            document.body.innerHTML = `
                <h1>Extension Authentication</h1>
                <p>Please complete your login...</p>
            `;
        }
        
        // Function to complete authentication
        function completeAuth(jwtToken) {
            const extensionId = "your-extension-id-here";
            
            if (typeof chrome !== 'undefined' && chrome.runtime) {
                chrome.runtime.sendMessage(
                    extensionId,
                    {
                        type: "AUTH_TOKEN",
                        token: jwtToken
                    },
                    (response) => {
                        if (response && response.success) {
                            alert("Successfully logged in to extension!");
                            window.close();
                        } else {
                            alert("Failed to authenticate with extension");
                        }
                    }
                );
            } else {
                alert("This feature requires Chrome extension support");
            }
        }
        
        // Example: Simulate successful login
        setTimeout(() => {
            if (fromExtension) {
                // Replace with your actual JWT token after successful auth
                completeAuth("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...");
            }
        }, 2000);
    </script>
</body>
</html>
```

## Backend API Requirements

Your backend should accept the same message format as OpenRouter:

```typescript
// Request format
{
  "model": "anthropic/claude-3.7-sonnet:thinking",
  "messages": [
    {
      "role": "system",
      "content": "system prompt"
    },
    {
      "role": "user", 
      "content": "user message"
    }
  ]
}

// Response format
{
  "choices": [
    {
      "message": {
        "content": "AI response here"
      }
    }
  ]
}
```

## Testing

### 1. Test Extension Build

```bash
npm run dev
```

### 2. Test External Messaging

1. Load the extension in Chrome
2. Get the extension ID from `chrome://extensions`
3. Open your web app with `?extension=true` parameter
4. Complete authentication flow
5. Check extension popup to see login status

### 3. Test API Priority

1. **With auth token**: Should use your backend
2. **Without auth but with OpenRouter key**: Should use OpenRouter
3. **Without either**: Should show login/API key options

## Security Considerations

1. **JWT Validation**: The extension validates JWT expiry but doesn't verify signatures
2. **HTTPS Only**: Ensure all auth flows use HTTPS
3. **Token Storage**: JWT tokens are stored in Chrome's extension storage
4. **Scope Limiting**: Only your specific domain should send auth tokens

## Troubleshooting

### Common Issues

1. **External messaging not working**: Check extension ID is correct
2. **JWT parsing errors**: Ensure token format is valid
3. **CORS issues**: Configure your backend to accept requests from extension
4. **Manifest permissions**: Plasmo handles this automatically

### Debug Steps

1. Open Chrome DevTools → Extensions tab
2. Check background script console for errors
3. Test with simple curl commands to verify API endpoints
4. Use `chrome.runtime.lastError` to debug messaging issues

## Future Enhancements

1. **Token refresh**: Implement automatic token refresh
2. **Multi-account**: Support multiple accounts
3. **Offline mode**: Cache responses for offline use
4. **Analytics**: Track usage patterns
