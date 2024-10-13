import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import errorImage from '../assets/images/errorPageImage.jpg'; 
import { usePageTitle } from "../utils/usePageTitle";

function ErrorPage() {
  usePageTitle("TechVoyage | 404 Error")
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col sm:flex-row  h-screen">
      {/* Left side - image */}
      <div
        className="sm:w-1/2 h-full sm:h-full"
        style={{
          backgroundImage: `url(${errorImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Right side - text */}
      <div className="sm:w-1/2 bg-[#f6e7d8] flex flex-col sm:justify-center items-center text-center p-12 h-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Oops! Wrong Turn...
        </h1>
        <p className="text-lg text-gray-600 mb-8">
        Looks like you've wandered off the beaten path. Our team is working to get you back on track and find what you're looking for.
        </p>
        <Link to="/" className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600">
          GO TO HOME
        </Link>
        <p className="text-gray-400 mt-4">Error code: {error?.status || 404}</p>
      </div>
    </div>
  );
}

export default ErrorPage;
