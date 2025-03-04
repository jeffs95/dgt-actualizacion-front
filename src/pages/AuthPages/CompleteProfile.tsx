import AuthLayout from "./AuthPageLayout";
import CompleteProfile from "../../components/auth/CompleteProfile";

export default function SignIn() {
  return (
    <>
      <AuthLayout>
        <CompleteProfile />
      </AuthLayout>
    </>
  );
}
