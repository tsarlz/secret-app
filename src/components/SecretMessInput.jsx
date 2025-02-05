const SecretMessInput = ({
  secretMessage,
  setSecretMessage,
  handleAddMessage,
  profiles,
  pathName,
}) => {
  return (
    <div className="flex flex-col items-center justify-center mt-5 space-y-2">
      <p>
        {profiles.secret_message
          ? profiles.secret_message
          : "No Current Message"}
      </p>
      {(pathName == "/secret-page-2" || pathName == "/secret-page-3") && (
        // Set Secret Message
        <div className="h-8 flex rounded-md">
          <input
            value={secretMessage}
            onChange={(e) => setSecretMessage(e.target.value)}
            type="text"
            className="h-full rounded-l-md outline-none text-[#333] px-2"
          />
          <button
            onClick={handleAddMessage}
            className="bg-blue-500 hover:bg-blue-600 rounded-r-md text-xs h-full w-12 font-semibold text-center"
          >
            {profiles?.secret_message ? "Edit" : "Add"}
          </button>
        </div>
      )}
    </div>
  );
};

export default SecretMessInput;
