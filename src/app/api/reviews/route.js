import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const REVIEW_CATEGORIES = [
  "Общее",
  "Грыжа",
  "Варикоз",
  "Неврит лицевого нерва",
  "Воспаление седалищного нерва",
  "Невралгия тройничного нерва",
  "Артрит / артроз",
  "Рассеянный склероз",
  "Болезнь Паркинсона",
];

const supabase =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey)
    : null;

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidCategory(category) {
  return REVIEW_CATEGORIES.includes(category);
}

export async function GET() {
  if (!supabase) {
    return NextResponse.json(
      { message: "Supabase is not configured." },
      { status: 500 }
    );
  }

  const { data, error } = await supabase
    .from("reviews")
    .select("id, author_name, rating, text, category, created_at, is_featured")
    .eq("status", "approved")
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { message: "Не удалось загрузить отзывы." },
      { status: 500 }
    );
  }

  return NextResponse.json({ reviews: data ?? [] });
}

export async function POST(request) {
  if (!supabase) {
    return NextResponse.json(
      { message: "Supabase is not configured." },
      { status: 500 }
    );
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Некорректные данные формы." },
      { status: 400 }
    );
  }

  const authorName = normalizeText(body.authorName);
  const email = normalizeText(body.email).toLowerCase();
  const text = normalizeText(body.text);
  const category = normalizeText(body.category) || "Общее";
  const rating = Number(body.rating);

  if (authorName.length < 2 || authorName.length > 80) {
    return NextResponse.json(
      { message: "Укажите имя от 2 до 80 символов." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email) || email.length > 120) {
    return NextResponse.json(
      { message: "Укажите корректную почту." },
      { status: 400 }
    );
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json(
      { message: "Оценка должна быть от 1 до 5." },
      { status: 400 }
    );
  }

  if (!isValidCategory(category)) {
    return NextResponse.json(
      { message: "Выберите корректную категорию отзыва." },
      { status: 400 }
    );
  }

  if (text.length < 10 || text.length > 1200) {
    return NextResponse.json(
      { message: "Отзыв должен быть от 10 до 1200 символов." },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("reviews").insert({
    author_name: authorName,
    email,
    rating,
    text,
    category,
    status: "pending",
    source: "site",
  });

  if (error) {
    return NextResponse.json(
      { message: "Не удалось отправить отзыв. Попробуйте позже." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Спасибо! Отзыв отправлен и появится после проверки.",
  });
}