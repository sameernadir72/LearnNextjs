import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function listInvoices() {
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 500;
  `;

  return data;
}
async function postInvoice() {
  const data = await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES ('3958dc9e-742f-4377-85e9-fec4b6a6442a', 500, 'paid', '2023-01-01');
  `;

  return data;
}

export async function GET() {
  try {
    return Response.json(await listInvoices());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function POST() {
  try {
    return Response.json(await postInvoice());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
