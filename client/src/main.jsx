import ReactDOM from 'react-dom/client';
import App from './App';
import 'styles/index.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from 'contexts/AuthContext';

const clientQuery = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={clientQuery}>
    <GoogleOAuthProvider clientId="897694141247-um1penk1fu3rp8tdasa2i5dlprfs337h.apps.googleusercontent.com">
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
