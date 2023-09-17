import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { Formik } from "formik";
import * as Yup from "yup";
import { firestore } from "../config/firebase";
import { Fragment, useMemo, useState } from "react";
import AppFormStatus from "../components/forms/AppFormStatus";
import SubmitButton from "../components/forms/SubmitButton";
import AppFormField from "../components/forms/AppFormField";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import { ArrowRight } from "react-feather";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function NewOrder() {
  const initialValues = {
    code: "",
  };

  const loginSchema = Yup.object().shape({
    code: Yup.string().required(),
  });

  const [customer, setcustomer] = useState<any>();

  const handleCode = (values, { setSubmitting, setStatus }) => {
    return getDocs(
      query(
        collection(firestore, "employees"),
        where("code", "==", values.code?.toString())
      )
    )
      .then(({ docs }) => {
        if (docs.length === 0) {
          setStatus({
            error: "Employee not found",
          });
        } else {
          setcustomer({ ...docs[0].data(), id: docs[0].id });
        }
      })
      .catch((err: any) => {
        setSubmitting(false);
        setStatus({
          error: err?.message,
        });
      });
  };

  const fetchMenus = async (e) => {
    const { search, show } = e.queryKey[1];

    const allMenusFromFirebase: any = await getDocs(
      query(collection(firestore, "menus"))
    ).then((e) => {
      return e.docs.map((e) => {
        return {
          id: e.id,
          ...e.data(),
        };
      });
    });

    const res = allMenusFromFirebase.filter((menus: any) => {
      console.log(menus["name"]?.toLowerCase());
      return (
        !search ||
        (menus["name"]?.toLowerCase() || "").includes(search.toLowerCase())
      );
    });
    return {
      total: res.length,
      results: res.slice(0, show),
    };
  };

  const qk = useMemo(() => ["employees-menus"], []);

  const { status, data, error } = useQuery({
    queryFn: fetchMenus,
    enabled: Boolean(customer),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    queryKey: qk,
    retry: false,
  });

  const navigate = useNavigate();

  const createOrder = (e) => {
    setorderingMenu(e.id);
    console.log({
      customer: {
        names: customer.names,
        id: customer.id,
        photo: customer.photo,
      },
      amount: e.price,
      menu: {
        name: e.name,
        id: e.id,
        image: e.image,
        price: e.price,
        description: e.description,
        ingredients: e.ingredients,
      },
      status: "pending",
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });
    return addDoc(collection(firestore, "orders"), {
      customer: {
        names: customer.names,
        id: customer.id,
        photo: customer.photo,
      },
      amount: e.price,
      menu: {
        name: e.name,
        id: e.id,
        image: e.image,
        price: e.price,
        description: e.description,
        ingredients: e.ingredients,
      },
      status: "pending",
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    })
      .then((res) => {
        setorderingMenu(undefined);
        toast.success("Order created successfully");
        navigate(`/orders/${res.id}`);
      })
      .catch((err) => {
        console.log(err);
        setorderingMenu(undefined);
        toast.success("Failed to create order");
      });
  };

  const [orderingMenu, setorderingMenu] = useState(false);

  return (
    <div className="px-3">
      <div
        className={`bg-white border border-t-4 border-t-yellow-400 ${
          customer ? " max-w-[600px]" : " max-w-[500px]"
        } my-12 mx-auto p-2 rounded-md`}
      >
        {customer ? (
          <Fragment>
            <div className="py-4">
              <div className="flex items-center justify-center gap-2 flex-col">
                <img
                  className="rounded-full w-20 object-cover h-20"
                  src={customer.photo}
                  alt=""
                />
                <h4 className="text-slate-900 mt-2 font-semibold capitalize">
                  {customer.names}
                </h4>
                <span className="capitalize text-slate-500 text-sm font-medium">
                  {customer.role}
                </span>
              </div>
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink uppercase font-semibold text-[13px] mx-4 text-slate-500">
                  Choose your menu.
                </span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>
              <div>
                {status === "loading" && (
                  <div className="h-[300px] w-full flex items-center justify-center">
                    <Loader />
                  </div>
                )}
                {status === "error" && (
                  <div className="h-[300px] w-full flex items-center justify-center">
                    <div className="text-gray-500 text-[13px] font-medium">
                      {error["message"]}
                    </div>
                  </div>
                )}
                {status === "success" && data?.results?.length === 0 && (
                  <div className="h-[300px] w-full flex items-center justify-center">
                    <div>
                      <p className="text-gray-500 text-[13px] font-medium">
                        No results found
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {status === "success" && data?.results?.length > 0 && (
                <div>
                  {data?.results.map((menu: any) => {
                    return (
                      <div
                        key={menu?.id}
                        className="flex px-1 items-center justify-between last:border-b-0 border-b border-slate-200 py-2"
                      >
                        <div className="flex items-start gap-4">
                          <img
                            className="rounded-md w-36 border bg-slate-300 object-cover h-32"
                            src={menu?.image}
                            alt=""
                          />
                          <div className="space-y-1">
                            <h4 className="text-slate-900 text-sm font-semibold capitalize">
                              {menu?.name}
                            </h4>
                            <div className="space-y-1 flex flex-col">
                              <span className="capitalize leading-7 text-slate-500 text-sm font-medium">
                                {menu.description}
                              </span>
                              <span className="capitalize leading-6 text-slate-500 text-sm font-medium">
                                <span className="text-sm font-semibold text-blue-700">
                                  Ingredients:
                                </span>{" "}
                                {menu.ingredients.join(", ")}
                              </span>
                            </div>
                            <div className="my-2 -ml-2">
                              <a
                                onClick={() => createOrder(menu)}
                                className="flex w-fit items-center text-[14px] hover:bg-slate-100 px-3 cursor-pointer py-[6px] rounded-md  text-yellow-500 font-semibold gap-2"
                              >
                                {orderingMenu === menu.id ? (
                                  "Laoding..."
                                ) : (
                                  <Fragment>
                                    <span className="truncate">
                                      Order {menu.price} Frw
                                    </span>
                                    <ArrowRight size={16} />
                                  </Fragment>
                                )}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="rounded-md p-4 bg-white py-4">
              <Formik
                initialValues={initialValues}
                validationSchema={loginSchema}
                onSubmit={handleCode}
              >
                {() => (
                  <div>
                    <div className="flex pt-3 mb-2 items-center justify-center gap-3 flex-col">
                      <h4 className="text-[17px] text-slate-700 font-semibold">
                        Welcome Back, Enter your code.
                      </h4>
                      <p className="text-sm text-center font-medium leading-8 text-slate-500">
                        Enter your code to identify your mtn employee profile.
                      </p>
                    </div>
                    <div className="space-y-3 mt-6">
                      <AppFormStatus />
                      <div>
                        <AppFormField
                          name={"code"}
                          placeholder="Enter your mtn code"
                          label="Mtn Code"
                          type="number"
                        />
                      </div>

                      <div className="w-full">
                        <SubmitButton className="!w-full" fullWidth>
                          Verify Code
                        </SubmitButton>
                      </div>
                    </div>
                  </div>
                )}
              </Formik>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}
