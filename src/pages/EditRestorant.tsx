import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";
import RestorantForm from "../components/RestorantForm";

export default function EditRestorant() {
  const params = useParams();

  const id = params?.id;

  const { status, data, error } = useQuery({
    queryFn: () =>
      getDoc(doc(firestore, "restorants", id)).then((res) => {
        return {
          ...res.data(),
          id: res.id,
        };
      }),
    keepPreviousData: true,
    queryKey: ["restorants", id],
    retry: 1,
  });

  return (
    <div>
      <div>
        {status === "loading" && (
          <div className="w-full h-[50vh] justify-center flex items-center">
            <Loader />
          </div>
        )}
        {status === "error" && (
          <div className="h-[300px] w-full flex items-center justify-center">
            <div className="text-gray-500 leading-7 text-[13px] font-medium">
              {error["response"]?.data?.message || error["message"]}
            </div>
          </div>
        )}
        {status === "success" && (
          <>
            {data["name"] ? (
              <RestorantForm restorant={data} />
            ) : (
              <div className="h-[300px] w-full flex items-center justify-center">
                <div className="text-gray-500 leading-7 text-[13px] font-medium">
                  Opps - Restorant not found.
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
