//import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Dashboard } from "@modules/Dashboard";
import { Navbar } from "@modules/Shared/layout";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
//import { isWallectConnected } from "@modules/Shared/services/blockchain";

const queryClient = new QueryClient();

function App() {
  // useEffect(() => {
  //   isWallectConnected();
  // }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <div className=" h-screen bg-bodyBg   ">
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
