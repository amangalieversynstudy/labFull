import { useState } from "react";

function MyForm() {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`You typed: ${text}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;
