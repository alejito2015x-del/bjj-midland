"use client";

import dynamic from "next/dynamic";

const GiScrollSection = dynamic(() => import("./GiScrollSection"), {
  ssr: false,
  loading: () => <div style={{ height: "430vh" }} />,
});
const NoGiScrollSection = dynamic(() => import("./NoGiScrollSection"), {
  ssr: false,
  loading: () => <div style={{ height: "430vh" }} />,
});
const MmaScrollSection = dynamic(() => import("./MmaScrollSection"), {
  ssr: false,
  loading: () => <div style={{ height: "430vh" }} />,
});

export default function ScrollSections() {
  return (
    <>
      <GiScrollSection />
      <NoGiScrollSection />
      <MmaScrollSection />
    </>
  );
}
