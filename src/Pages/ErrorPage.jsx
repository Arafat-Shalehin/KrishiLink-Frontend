import React from "react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-gray-800 px-4">
      {/* Main error icon */}
      <div className="text-9xl mb-6 animate-bounce text-green-600">🌱</div>

      {/* Error text */}
      <h1 className="text-2xl md:text-4xl font-bold mb-2">Oops! Something went wrong</h1>
      <p className="text-lg mb-6 text-center max-w-md">
        It seems like this page is lost in the fields. Don’t worry, we’ll get it back on track!
      </p>

      {/* Back to home button */}
      <a
        href="/"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-300"
      >
        Go Back Home
      </a>

      {/* Optional extra visual */}
      <div className="mt-12 flex space-x-4">
        <span className="text-2xl animate-bounce">🌾</span>
        <span className="text-2xl animate-bounce delay-150">🚜</span>
        <span className="text-2xl animate-bounce delay-300">🌻</span>
      </div>
    </div>
  );
};

export default ErrorPage;