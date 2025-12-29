import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../services/api';

export default function PaymentVerificationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    let cancelled = false;

    async function verifyOrderWithRetry() {
      if (!sessionId) {
        navigate('/checkout');
        return;
      }

      const maxAttempts = 5;
      const delayMs = 2000;

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        if (cancelled) return;
        try {
          const res = await api.get(`/order/verify?session_id=${sessionId}`);
          if (res.data && res.data.orderId) {
            navigate(`/orders/${res.data.orderId}`);
            return;
          }
        } catch (err) {
          // ignore and retry
        }

        // wait before next attempt
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }

      if (!cancelled) navigate('/checkout');
    }

    verifyOrderWithRetry();

    return () => {
      cancelled = true;
    };
  }, [sessionId, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg font-semibold">Verifying your payment...</div>
    </div>
  );
}
