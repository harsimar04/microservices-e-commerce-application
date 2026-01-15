import React, { useEffect, useState } from "react";
import axios from "axios";

type Deal = {
  id?: string;
  _id?: string;
  title?: string;
  name?: string;
  price?: number | string;
};

const Deals: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_PRODUCTS_API}/deals`
        );

        const raw = res?.data;

        // 🔒 HARD NORMALIZATION (THIS IS THE KEY)
        let normalized: Deal[] = [];

        if (Array.isArray(raw)) {
          normalized = raw;
        } else if (Array.isArray(raw?.data)) {
          normalized = raw.data;
        } else if (Array.isArray(raw?.deals)) {
          normalized = raw.deals;
        }

        setDeals(normalized);
      } catch (e) {
        console.error("Deals fetch failed:", e);
        setDeals([]);
        setError("Failed to load deals");
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
        deals.slice(0, 5).map((deal, index) => (
          <div
            key={deal.id || deal._id || index}
            style={{ border: "1px solid #ddd", margin: 8, padding: 8 }}
          >
            <p>{deal.title || deal.name || "Deal"}</p>
            {deal.price && <p>₹{deal.price}</p>}
          </div>
        ))
      )}
    </div>
  );
};

export default Deals;

