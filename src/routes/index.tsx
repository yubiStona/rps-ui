import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import NotFound from "../Component/NotFound";
import AuthFlow from "../Component/AuthWrapper/AuthFlow";
import AdminDashboard from "../pages/admin/Dashboard";
import StudentManagement from "../pages/admin/StudentManagement";
import TeacherManagement from "../pages/admin/TeacherManagement";
import MarksEntry from "../pages/teacher/MarksEntry";
import StudentResults from "../pages/student/Results";
import { getRoleByType } from "../helper";
import DashboardLayout from "../layouts/DashboardLayout";
import TeacherDashboard from "../pages/teacher/Dashboard";
const AppRouter = () => {
  const { user } = useAppSelector((state) => state.auth);

  const isAuthenticated = !!user;

  const ProtectedRoute: React.FC<{
    children: React.ReactNode;
    requiredRole?: string;
  }> = ({ children, requiredRole }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }

    if (requiredRole && getRoleByType(user?.UserType) !== requiredRole) {
      return (
        <Navigate to={`/${getRoleByType(user?.UserType)}/dashboard`} replace />
      );
    }
    return <>{children}</>;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <AuthFlow />
            ) : (
              <Navigate
                to={`/${getRoleByType(user?.UserType)}/dashboard`}
                replace
              />
            )
          }
        />
        {/* Admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <ProtectedRoute requiredRole="admin">
              <StudentManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/teachers"
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardLayout>
                <TeacherManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Teacher routes */}
        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute requiredRole="teacher">
              <DashboardLayout>
                <TeacherDashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/marks"
          element={
            <ProtectedRoute requiredRole="teacher">
              <DashboardLayout>
                <MarksEntry />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        {/* Teacher routes */}

        {/* student routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute requiredRole="student">
              <DashboardLayout>
                <div>Comin soon</div>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/students/results"
          element={
            <ProtectedRoute requiredRole="student">
              <DashboardLayout>
                <StudentResults />
              </DashboardLayout>{" "}
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
