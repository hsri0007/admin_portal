import AuthGuard from "../../guard/authguard";
import AdminComponent from "../../components/adminComponent/adminComponent";

const Admin = () => {
  return (
    <AuthGuard>
      <AdminComponent />
    </AuthGuard>
  );
};

export default Admin;
