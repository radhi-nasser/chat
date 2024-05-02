import { Router } from "./router";

export const App = () => {
  return (
    <div className="app">
      <Router />
    </div>
  );

  // return (
  //   <div className="app">
  //     {currentUser ? (
  //       <Chat currentUser={currentUser} onLogout={() => setCurrentUser(null)} />
  //     ) : (
  //       <Login />
  //       // <Login onLogin={setCurrentUser} />
  //     )}
  //   </div>
  // );
};

export default App;
