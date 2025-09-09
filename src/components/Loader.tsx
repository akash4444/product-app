const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex space-x-2">
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
      </div>
    </div>
  );
};

export default Loader;
