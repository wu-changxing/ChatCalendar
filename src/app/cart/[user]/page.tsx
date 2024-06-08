import { kv } from "@vercel/kv";

export default async function Cart({ params }: { params: { user: string } }) {
  const cart = await kv.get<{ id: string; quantity: number }[]>(params.user);
  return (
    <div>
      {cart?.map((item) => (
        <div key={item.id}>
          {item.id} - {item.quantity}
        </div>
      ))}
    </div>
  );
}