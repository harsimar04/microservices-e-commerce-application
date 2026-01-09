import React, { useEffect, useState } from "react";
import axios from "axios";

type Deal = {
  id?: string;
  _id?: string;
  name?: string;
  title?: string;
  price?: number;
};

const Deals: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_PRODUCTS_API}/deals`
        );

        const data = res.data;

        // 🔒 GUARANTEE: deals is ALWAYS an array
        if (Array.isArray(data)) {
          setDeals(data);
        } else if (Array.isArray(data?.data)) {
          setDeals(data.data);
        } else if (Array.isArray(data?.deals)) {
          setDeals(data.deals);
        } else {
          setDeals([]);
        }
      } catch (err) {
        console.error("Failed to fetch deals", err);
        setError("Unable to load deals");
        setDeals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  if (loading) return <p>Loading deals...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Deals</h2>

      {deals.length === 0 ? (
        <p>No deals available</p>
      ) : (
        deals.slice(0, 4).map((deal, index) => (
          <div key={deal.id || deal._id || index}>
            <p>{deal.name || deal.title || "Deal"}</p>
            {deal.price && <p>₹{deal.price}</p>}
          </div>
        ))
      )}
    </div>
  );
};

export default Deals;

