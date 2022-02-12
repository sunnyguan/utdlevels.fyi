import 'tailwindcss/tailwind.css';
import {ProvideAuth} from '../lib/use-auth';

function MyApp({Component, pageProps}) {
    return (
        <ProvideAuth>
            <Component {...pageProps} />
        </ProvideAuth>
    );
}

export default MyApp;
