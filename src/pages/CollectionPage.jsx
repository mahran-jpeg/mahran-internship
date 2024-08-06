import React, { useEffect, useState } from "react";
import CollectionHeader from "../components/collection/CollectionHeader";
import CollectionInfo from "../components/collection/CollectionInfo";
import CollectionItems from "../components/collection/CollectionItems";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CollectionPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const [selectedCollection, setSelectedCollection] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getData() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://remote-internship-api-production.up.railway.app/collection/${id}`
      );
      if (data === "False") {
        setSelectedCollection([]);
      } else {
        setSelectedCollection(data.data);
        setSelectedItems(data.data.items);
      }
    } catch (error) {
      setSelectedCollection({});
      setSelectedItems([]);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <CollectionHeader selectedCollection={selectedCollection} loading={loading} />
      <CollectionInfo selectedCollection={selectedCollection} loading={loading} />
      <CollectionItems
        selectedCollection={selectedCollection}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        loading={loading}
      />
    </>
  );
}
