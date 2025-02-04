// "use client";

const SecretMessInput = ({
  secretMessage,
  setSecretMessage,
  handleAddMessage,
  profiles,
}) => {
  return (
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
  );
};

export default SecretMessInput;
