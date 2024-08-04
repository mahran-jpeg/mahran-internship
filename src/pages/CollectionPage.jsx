import React, { useEffect } from "react";
import CollectionHeader from "../components/collection/CollectionHeader";
import CollectionInfo from "../components/collection/CollectionInfo";
import CollectionItems from "../components/collection/CollectionItems";
import Card from "../components/collection/Card";
export default function CollectionPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <CollectionHeader />
      <CollectionInfo />
      <CollectionItems />
    </>
  );
}
