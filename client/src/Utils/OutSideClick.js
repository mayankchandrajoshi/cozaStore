import { useEffect } from "react";

export default function OutsideClick(ref,closeRef,openRef,setShowSideBar) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && (ref.current!=event.target||closeRef.current.contains(event.target))&&!openRef.current.contains(event.target)) {
        setShowSideBar(false);
      } else {
        setShowSideBar(true);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);
}