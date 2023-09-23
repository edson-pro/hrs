import React, { useEffect, useRef, useState } from "react";
import Loader from "../components/Loader";
import QRCode from "react-qr-code";
import ReactToPrint from "react-to-print";
import { useAuth } from "../context/authContext";

export default function QrCode() {
  const [loadingQrCode, setloadingQrCode] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setloadingQrCode(false);
    }, 1000);
  }, []);
  const componentRef = useRef();

  const { user }: any = useAuth();
  return (
    <div>
      <div className="flex bg-white rounded-md border-[3px] overflow-hidden border-yellow-300 max-w-sm mx-auto gap-4 h-60">
        {loadingQrCode ? (
          <div className="flex w-full h-full justify-center items-center flex-col gap-2 text-center">
            <Loader />
          </div>
        ) : (
          <div
            className="!my-14"
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 120,
              width: "100%",
            }}
          >
            <ComponentToPrint
              restorantId={user.restorantId}
              ref={componentRef}
            />
          </div>
        )}
      </div>
      <div className="flex-col flex items-center gap-1 mt-4">
        <h4 className="font-medium text-slate-500 leading-7 text-sm">
          Scan the qr code or click below to print.
        </h4>
        <ReactToPrint
          trigger={() => (
            <a className="text-sm cursor-pointer text-blue-500 font-semibold underline">
              Print Qr code
            </a>
          )}
          content={() => componentRef.current}
        />
      </div>
    </div>
  );
}

const ComponentToPrint = React.forwardRef((props: any, ref: any) => {
  return (
    <div className="p-2" ref={ref}>
      <QRCode
        size={456}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={`http://172.20.10.9:5173/new-order?restorantId=${props?.restorantId}`}
        viewBox={`0 0 256 256`}
      />
    </div>
  );
});
