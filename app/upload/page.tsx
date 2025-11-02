import UploadForm from "@/components/upload";
import { Protect ,RedirectToSignIn} from "@clerk/nextjs";

const uploadPage = () => {
  return (
    <Protect  fallback={<RedirectToSignIn />}>
      <div className="min-h-screen  bg-gradient-patches">
        <UploadForm />
      </div>
    </Protect>
  );
};

export default uploadPage;
