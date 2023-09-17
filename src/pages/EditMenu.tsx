import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import MenuForm from "../components/MenuForm";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../config/firebase";

export default function EditMenu() {
  const params = useParams();

  const id = params?.id;

  console.log(id);

  const { status, data, error } = useQuery({
    queryFn: () =>
      getDoc(doc(firestore, "menus", id)).then((res) => {
        return {
          ...res.data(),
          id: res.id,
        };
      }),
    keepPreviousData: true,
    queryKey: ["menus", id],
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
              <MenuForm menu={data} />
            ) : (
              <div className="h-[300px] w-full flex items-center justify-center">
                <div className="text-gray-500 leading-7 text-[13px] font-medium">
                  Opps - Menu not found.
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
