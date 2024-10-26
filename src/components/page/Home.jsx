import GetAllProduct from "../GetAllProduct";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-gray-400 ">
      <div className="max-w-2xl lg:max-w-full w-full p-6 bg-black/40 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">
          Welcome to Home
        </h1>
        <GetAllProduct />
      </div>
    </div>
  );
};

export default Home;
