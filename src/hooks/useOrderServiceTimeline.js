import {
  useEffect,
  useState,
} from "react";

function useOrderServiceTimeline() {
  const [activeView, setActiveView] =
    useState("list");

  const [
    highlightNewOrder,
    setHighlightNewOrder,
  ] = useState(false);

  const [
    highlightProgramming,
    setHighlightProgramming,
  ] = useState(false);

  const [showToast, setShowToast] =
    useState(false);

  const [
    orderRegistered,
    setOrderRegistered,
  ] = useState(false);

  const [
    highlightProgrammedSummary,
    setHighlightProgrammedSummary,
  ] = useState(false);

  useEffect(() => {
    const startHighlightTimer =
      setTimeout(() => {
        setHighlightNewOrder(true);
      }, 1800);

    const openFormTimer =
      setTimeout(() => {
        setHighlightNewOrder(false);
        setActiveView("form");
      }, 2500);

    const focusProgrammingTimer =
      setTimeout(() => {
        setHighlightProgramming(true);
      }, 3200);

    const registerToastTimer =
      setTimeout(() => {
        setShowToast(true);
      }, 4700);

    const backToListTimer =
      setTimeout(() => {
        setHighlightProgramming(false);
        setOrderRegistered(true);
        setHighlightProgrammedSummary(true);
        setActiveView("updated-list");
      }, 5600);

    const hideToastTimer =
      setTimeout(() => {
        setShowToast(false);
      }, 6500);

    const stopSummaryHighlightTimer =
      setTimeout(() => {
        setHighlightProgrammedSummary(false);
      }, 7200);

    return () => {
      clearTimeout(startHighlightTimer);
      clearTimeout(openFormTimer);
      clearTimeout(focusProgrammingTimer);
      clearTimeout(registerToastTimer);
      clearTimeout(backToListTimer);
      clearTimeout(hideToastTimer);
      clearTimeout(stopSummaryHighlightTimer);
    };
  }, []);

  return {
    activeView,
    highlightNewOrder,
    highlightProgramming,
    showToast,
    orderRegistered,
    highlightProgrammedSummary,
  };
}

export default useOrderServiceTimeline;