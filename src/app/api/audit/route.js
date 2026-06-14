import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      business_name,
      website_url,
      ad_budget,
      contact_name,
      contact_email,
      phone,
      gmb_status,
    } = body;

    if (!business_name || !contact_name || !contact_email) {
      return NextResponse.json(
        { error: "Business name, contact name, and email are required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("submissions")
      .insert([
        {
          business_name,
          website_url,
          ad_budget,
          contact_name,
          contact_email,
          phone,
          gmb_status,
          status: "pending",
        },
      ])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
