import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

export default function Settings() {
  // User data and handlers
  const [user, setUser] = useState({ name: "", email: "" });

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, email: e.target.value }));
  };

  const handleLogout = () => {
    // Implement logout logic here
    alert("Logged out!");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Implement save logic here
    alert("Changes saved!");
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      
      <form className="max-w-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Name</label>
          <input type="text" value={user.name} onChange={handleNameChange} />
        </div>
        
        <div className="mb-4">
          <label>Email</label>
          <input type="email" value={user.email} onChange={handleEmailChange} />
        </div>
        
        <button 
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
        
        <button 
          type="button"
          onClick={handleLogout}
          className="ml-4 text-red-600 hover:underline"
        >
          Logout
        </button>
      </form>
    </div>
  );
}