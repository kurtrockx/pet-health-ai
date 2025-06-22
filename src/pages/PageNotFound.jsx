import errorImage from "../assets/error.png"; // Replace this with your actual image path

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <img src={errorImage} alt="Page Not Found" className="w-150 h-90 mb-6" />
      <h1 className="text-2xl font-semibold text-cyan-700">
        Uh-oh! A paw print led you the wrong way! 🐾
      </h1>
      <p className="text-gray-500 mt-2">
        Sorry, the page you're looking for doesn't exist.
      </p>
    </div>
  );
}
