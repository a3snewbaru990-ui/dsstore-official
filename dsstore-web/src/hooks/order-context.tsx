import { createContext, useContext, type ReactNode } from "react";
import { TOTAL_STEPS, useOrder } from "@/hooks/use-order";

export { TOTAL_STEPS };

type Order = ReturnType<typeof useOrder>;

const OrderContext = createContext<Order | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const order = useOrder();
  return <OrderContext.Provider value={order}>{children}</OrderContext.Provider>;
}

export function useOrderContext() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrderContext must be used inside <OrderProvider>");
  return ctx;
}
