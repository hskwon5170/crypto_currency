import { useEffect, useState } from "react";
// https://www.youtube.com/watch?v=Yj7ja6BANLM
export default function PopUpModal() {
  const [showModal, setShowModal] = useState(false);
  // 로컬스토리지의 정보를 가져와서
  // 빈값이면(setItem을 한적이 없으면, 오늘하루 닫기를 클릭하지 않았으면) setShowModal(true) === 모달보여주기

  const onClickClose = () => {
    setShowModal(false);
  };

  // 오늘 하루 닫기 버튼
  // 오늘 하루 닫기를 클릭하면 todayClose 로컬스토리지에 값을 저장
  const onClickTodayClose = () => {
    const expiryDate: number = new Date().getDate() + 1;
    localStorage.setItem("todayClose", String(expiryDate));
    setShowModal(false);
  };

  // 오늘 하루 닫기를 클릭해서 로컬스토리지에 저장된 값이 있으면 showModal(false)
  // todayClose 값이 없다면 (!클릭) showModal(true)
  useEffect(() => {
    const before = localStorage.getItem("todayClose") || "";
    const now = Math.floor(new Date().getDate());
    if (before === "") {
      setShowModal(true);
    } else {
      if (now >= Number(before)) {
        setShowModal(true);
      }
    }
  }, []);

  const onClickMoveToUrl = (url: string) => {
    window.open(url);
  };

  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <>
      {showModal && (
        <div className="fixed flex flex-col overflow-hidden top-0 left-0 w-full h-full p-10 bg-black bg-opacity-80 z-[10000] ">
          <div className="w-[22vw] h-auto sm:w-[80vw] bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md">
            <div className="bg-black">
              {!imageLoaded && (
                <div
                  className="rounded-tl-md rounded-tr-md animate-pulse"
                  style={{
                    width: "100%",
                    height: "21rem",
                    backgroundColor: "#f0f0f0",
                  }}
                />
              )}
              {/* <img
                src={env.app.publicUrl + '/asset/iOS_Event.png'}
                className="w-full h-ful rounded-tl-md rounded-tr-md"
                onLoad={() => setImageLoaded(true)}
                style={{ display: imageLoaded ? 'block' : 'none' }}
              /> */}
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col items-center  px-6 py-5 gap-3 ">
                <button
                  onClick={() =>
                    onClickMoveToUrl(
                      `https://www.youtube.com/watch?v=Yj7ja6BANLM`
                    )
                  }
                  className="bg-[#5347cf] rounded-md w-full h-[2.5rem] text-white font-bold"
                >
                  Let's find out
                </button>
              </div>
              <div className="flex justify-center px-6">
                <div className="border-[0.1px] border-gray-300 w-full" />
              </div>
              <div className="flex flex-1 justify-between items-center px-6 py-5 font-bold text-gray-600">
                <div
                  className="cursor-pointer w-[50%] flex justify-center items-center"
                  onClick={onClickTodayClose}
                >
                  <div>Close Today</div>
                </div>
                <div className="text-gray-300">|</div>
                <div className="cursor-pointer w-[50%] flex justify-center items-center">
                  <div onClick={onClickClose}>Close</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
