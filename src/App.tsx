import { HashRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/protectedRoute";
import PublicRoute from "./utils/publicRoute";
import { AuthProvider } from "./lib/context/AuthContext";
import LogInPage from "./pages/LogInPage";
import Topbar from "./components/Topbar";
import HomePage from "./pages/HomePage";
import { TaskProvider } from "./lib/context/TaskContext";
import TaskPage from "./pages/TaskPage";
import { TaskFormProvider } from "./lib/context/TaskFormContext";

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <TaskProvider>
          <TaskFormProvider>
            <Topbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <LogInPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <TaskPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </TaskFormProvider>
        </TaskProvider>
      </AuthProvider>
    </HashRouter>
  );
}
export default App;
