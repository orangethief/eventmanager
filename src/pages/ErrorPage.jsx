import { Link, useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  let error = useRouteError();

  return (
    <section className='py-20'>
      <div className="-mx-4 flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative mx-auto max-w-4xl overflow-x-auto rounded-lg bg-white px-1 py-10 text-center text-black dark:bg-dark-2">
            {error.error.message}
            <pre>
              {error.error.stack}
            </pre>
            <Link to="/" className="inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold transition hover:bg-white hover:text-primary">
              &lt;- Go home, you're drunk
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
