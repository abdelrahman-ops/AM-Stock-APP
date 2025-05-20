export default function Settings() {
  // User data and handlers
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      
      <form className="max-w-md">
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